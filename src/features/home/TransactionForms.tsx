import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import React, {useState} from "react";
import {StockAsset, usePortfolio} from "./UsePortfolio";
import {USDollar} from "../../shared/StockUtils";
import {PercentChangeFormatter} from "../../shared/StockComponents";
import {parseTickerData, StockTickerData} from "../../shared/StockUtils";
import {useUserData} from "../../core/UseUserData";
import {axios} from "../../core/UseAxiosApi";

// todo MAX VALUE nan for when the amount is 0
//todo Add skeleton (when you buy stock it will go here for empty table
//todo loading skeleton for name instead of undefined
export const BuyStockForm = () => {
    const [searchInput, setSearchInput] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [unknownError, setUnknownError] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [stockData, setStockData] = useState<StockTickerData | null>(null);
    const {userData, updateAfterBuy} = useUserData();
    const cashValue = userData.cashValue;
    const {buyStock} = usePortfolio();
    const [sharesToBuy, setSharesToBuy] = useState(0);
    const searchTicker = () => {
        setSharesToBuy(0);
        setLoadingData(true);
        axios.get('stock', {params: {ticker: searchInput}}).then((res) => {
            console.log(res);
            if (res.status !== undefined && (Math.floor(res.status / 100) === 4 || Math.floor(res.status / 100) === 5)) {
                setStockData(null);
                setErrorMessage(true);
            } else {
                const stockTickerData = parseTickerData(res.data);
                setErrorMessage(false);
                setStockData(stockTickerData);
            }
            setLoadingData(false);
        }).catch((err) => {
            setStockData(null);
            setErrorMessage(true);
            console.log("ERROR WHEN SEARCHING TICKER TO BUY", err);
        }).finally(() => {
            setLoadingData(false);
        });
    }

    const submitBuyForm = () => {
        if (stockData != null && !isNaN(sharesToBuy) && sharesToBuy > 0) {
            buyStock(stockData, sharesToBuy).then((res) => {
                setStockData(null);
                setSearchInput('');
                updateAfterBuy(stockData, sharesToBuy);
            });
        }
    }

    const border = (errorMessage || unknownError) ? 'border-2 border-solid border-red-600 focus-within:border-2 focus-within:border-solid focus-within:border-red-600' : ''
    return (
        <div className={"w-full bg-gray-200 max-h-92 p-2"}>
            {errorMessage && (<span className={"text-red-600"}>Invalid ticker!</span>)}
            {unknownError && (<span className={"text-red-600"}>An unknown error occurred</span>)}
            <label className={`${border} input input-bordered bg-gray-300 flex items-center gap-2`}>
                <input type="text" value={searchInput} className={"grow"} placeholder="Stock Ticker" maxLength={20}
                       onChange={(e) => {
                           setSearchInput(e.currentTarget.value);
                       }}
                       onKeyDown={(keyEvent: React.KeyboardEvent<HTMLInputElement>) => {
                           if (keyEvent.key === "Enter" && searchInput !== '' && stockData?.ticker !== searchInput.toUpperCase()) {
                               searchTicker();
                           }
                       }}
                />
                <MagnifyingGlassIcon onClick={() => {
                    if (searchInput !== '' && stockData?.ticker !== searchInput.toUpperCase()) {
                        searchTicker()
                    }
                }}
                                     className={"size-6 hover:size-9 cursor-pointer hover:animate-pulse hover:translate-x-1.5 font-bold transition-all ease-in-out "}/>
            </label>

            {loadingData ? <BuyStockSkeleton/> :
                (stockData !== null ?
                    <div className={"flex flex-col"}>
                        <StockFormData stockAsset={stockData}/>

                        <div className={"mt-4 pl-2 flex flex-row gap-1 flex-wrap items-center justify-between"}>
                            <div className={"basis-1/2"}>
                                <div className={"pl-2 text-gray-700"}>
                                    Max: {Math.floor(cashValue! / stockData.price)}
                                </div>
                                <label className={"input bg-gray-300 flex items-center"}>
                                    <span className={"text-gray-700 text-sm mr-2"}>Shares: </span>
                                    <input value={sharesToBuy} max={Math.floor(cashValue! / stockData.price)} min={0}
                                           onChange={(e) => {
                                               setSharesToBuy(parseInt(e.currentTarget.value))

                                           }} type={"number"} className={"w-full flex-1"}/>
                                </label>
                            </div>
                            <div className={"basis-2/5"}>
                                <div className={"pl-2 text-gray-700"}>
                                    Cost:
                                </div>
                                <div className={"text-xl text-black text-"}>
                                    {USDollar.format(isNaN(sharesToBuy * stockData.price) ? 0 : sharesToBuy * stockData.price)}
                                </div>
                            </div>
                        </div>

                        <div className={"ml-auto my-4 font-bold"}>
                            <button onClick={submitBuyForm} className={"btn btn-success btn-outline ml-4"}>Buy</button>
                        </div>
                    </div>
                    : <></>)
            }
        </div>
    );
}

const BuyStockSkeleton = () => {
    return (
        <div className={"mx-auto my-4 bg-gray-400 pt-2 pb-8 animate-pulse rounded-xl w-full"}>
            <div className={"my-4 bg-gray-700" +
                " py-8 animate-pulse rounded-xl w-1/4 mx-4"}></div>
            <div className={"my-4 bg-gray-700" +
                " py-8 animate-pulse rounded-xl w-4/5 mx-4"}></div>
        </div>
    );
}


export const SellStockForm = () => {
    const [searchInitialized, setSearchInitialized] = useState(false)
    const [stockAsset, setStockAsset] = useState<StockAsset>({} as StockAsset);
    const [sharesToSell, setSharesToSell] = useState(0);
    const {portfolio, sellStock} = usePortfolio();
    const [pastLimit, setPastLimit] = useState(false);
    const {updateAfterSell} = useUserData();
    const [selectedValue, setSelectedValue] = useState("default");

    const border = (pastLimit) ? 'border-2 border-solid border-red-600 focus-within:border-2 focus-within:border-solid' : '';
    const displayTickerData = (tickerIndex: number) => {
        setStockAsset(portfolio[tickerIndex]);
        setSearchInitialized(true);
    }

    const submitSellForm = () => {
        if (stockAsset != null && !isNaN(sharesToSell) && sharesToSell > 0 && sharesToSell <= stockAsset.shares) {
            setPastLimit(false);
            sellStock(stockAsset, sharesToSell).then((res) => {
                updateAfterSell(stockAsset, sharesToSell);
                setSearchInitialized(false);
                setSharesToSell(0);
                setSelectedValue("default");
            });
        } else if (sharesToSell > stockAsset.shares) {
            setPastLimit(true)
        }
    }

    return (
        <div className={"bg-gray-200 p-2"}>
            <select value={selectedValue} className="select bg-gray-300 select-bordered w-full max-h-80 max-w-xs"
                    onChange={(e) => {
                        displayTickerData(parseInt(e.currentTarget.value))
                        setSelectedValue(e.currentTarget.value)
                    }}>
                <option value={"default"} disabled selected>Select Stock Ticker</option>
                {portfolio?.map((stockAsset, index) => {
                    return <option value={index} key={index}>{stockAsset.ticker}</option>
                })}
            </select>
            {searchInitialized &&
                <div className={"flex flex-col"}>
                    <StockFormData stockAsset={stockAsset}/>

                    <div className={"mt-4 pl-2 flex flex-row gap-1 flex-wrap items-center justify-between"}>
                        <div className={"basis-1/2"}>
                            <div className={"pl-2 text-gray-700"}>
                                Max: {stockAsset?.shares}
                            </div>
                            <label className={`${border} input input-bordered bg-gray-300 flex items-center`}>
                                <span className={"text-gray-700 text-sm mr-2"}>Shares: </span>
                                <input value={sharesToSell} max={stockAsset?.shares} min={0} onChange={(e) => {
                                    if (parseInt(e.currentTarget.value) > stockAsset.shares) {
                                        setPastLimit(true)
                                    } else {
                                        setPastLimit(false)
                                    }
                                    setSharesToSell(parseInt(e.currentTarget.value))

                                }} type={"number"} className={"w-full flex-1"}/>
                            </label>
                            {pastLimit && <div className={"text-error"}>You can't sell that many shares</div>}
                        </div>
                        <div className={"basis-2/5"}>
                            <div className={"pl-2 text-gray-700"}>
                                Profit:
                            </div>
                            <div className={"text-xl text-black text-"}>
                                {USDollar.format(stockAsset === undefined || isNaN(sharesToSell * stockAsset?.price) ? 0 : sharesToSell * stockAsset?.price)}
                            </div>
                        </div>
                    </div>

                    <div className={"ml-auto my-4 font-bold"}>
                        <button onClick={submitSellForm} className={"btn btn-secondary btn-outline ml-4"}>Sell</button>
                    </div>
                </div>
            }
        </div>
    )
}

const StockFormData = ({stockAsset}: { stockAsset: StockAsset | StockTickerData | null }) => {
    return (
        (stockAsset === null ? (<> </>) : (
                <div className={"mt-4 px-2"}>
                    <div className={"flex flex-row items-center"}>
                        <div className={"mr-4"}>
                            <img className={"size=6"} src={stockAsset.logoUrl}
                                 alt={(stockAsset.ticker) + " Ticker"}/>
                        </div>
                        <div>
                            <p className={"font-bold text-xl"}>{stockAsset.ticker}</p>
                            <p className={"text-sm text-gray-700"}>{stockAsset.name}</p>
                        </div>
                    </div>
                    <div className={"font-bold mt-4 items-center justify-between text-2xl flex flex-row"}>
                        <p>{USDollar.format(stockAsset.price)}</p>
                        <PercentChangeFormatter percentChange={stockAsset.percentChange}/>
                    </div>
                </div>
            )
        )
    );
}