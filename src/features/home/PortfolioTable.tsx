import {USDollar} from "../../shared/UseStockAPI";
import React from "react";
import {StockAsset, usePortfolio} from "./UsePortfolio";
import {BuyStockForm, SellStockForm} from "./TransactionForms";
import {PercentChangeFormatter} from "../../shared/StockComponents";
import {useCurrentUser} from "../../core/useCurrentUser";


//todo: have sticy bar that is at the top whenever your scrool past the tour stock sign
export const PortfolioTable = () => {
    const {updatePortfolio} = useCurrentUser();
    const {portfolio, portfolioLoading} = usePortfolio(updatePortfolio);


    //TODO ADD UPDATER
    return (
        <div className={"basis-4/5 mt-6"}>

            <div id={"title&buy"} className={"mb-4 flex flex-row items-center justify-between"}>
                <div className={"text-4xl mb-2 basis-3/4 font-bold"}>Your Stock:</div>

                <div className={"flex flex-row basis-1/4 items-center justify-evenly gap-4"}>
                    <div className="dropdown dropdown-end basis-1/2">
                        <div tabIndex={0} role="button"
                             className={"text-black text-lg w-full transition-all ease-in-out hover:bg-green-300 bg-green-600 btn"}>Buy
                        </div>
                        <ul tabIndex={0}
                            className="dropdown-content z-[1] mt-2 text-black shadow bg-gray-200 menu rounded-box w-80">
                            <BuyStockForm/>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end basis-1/2">
                        <div tabIndex={0} role="button"
                             className={"text-black w-full text-lg transition-all ease-in-out btn btn-secondary"}>Sell
                        </div>
                        <ul tabIndex={0}
                            className="dropdown-content z-[1] mt-2 text-black menu shadow bg-gray-200 rounded-box w-80">
                            <SellStockForm portfolio={portfolio}/>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="rounded-xl bg-gray-600
                ">
                <table className="table overflow-clip text-black font-bold">
                    {/* head */}
                    <thead>
                    <tr className={"hover:bg-gray-500 text-gray-300 text-lg"}>
                        <th></th>
                        <th className={"w-1/6"}>Ticker</th>
                        <th className={"w-1/6"}>Company Name</th>
                        <th className={"w-1/6"}>Price</th>
                        <th className={"w-1/6"}>Percent Change</th>
                        <th className={"w-1/6"}>Shares</th>
                        <th className={"w-1/6"}>Total Value</th>
                    </tr>
                    </thead>

                    <tbody>


                    {!portfolioLoading && portfolio.map((listItem, index) => {
                        return <StonkRow index={index} key={listItem.ticker} stonk={listItem}/>
                    })}

                    {portfolioLoading && <PortfolioLoadingIndicator/>}

                    {/*Hard coded values before database was added*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    {/*<StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>*/}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

const StonkRow = ({stonk, index}: { stonk: StockAsset, index: number }) => {
    return (
        <tr className={"hover:bg-gray-500"}>
            <th className={"text-lg text-gray-300"}>
                <div>{index + 1}</div>
            </th>
            <td>
                <div className={"flex flex-row items-center gap-2"}>
                    <img className={"size-6 ml-2"} src={stonk.logoUrl}
                         alt={stonk.ticker + " ticker"}/>
                    <div>
                        {stonk.ticker}
                    </div>
                </div>
            </td>
            <td>{stonk.name}</td>
            <td>{USDollar.format(stonk.price)}</td>
            <td><PercentChangeFormatter percentChange={stonk.percentChange}/></td>
            <td>{stonk.shares}</td>
            <td>{USDollar.format(stonk.shares * stonk.price)}</td>
        </tr>
    );
}


const PortfolioLoadingIndicator = () => {
    const skeletons: any[] = [];
    const NUM_SKELETONS = 5
    for (let i = 0; i < NUM_SKELETONS; i++) {
        skeletons.push(<TableSkeleton key={i}/>);
    }
    return <>{skeletons} </>
}
const TableSkeleton = ({
                           key
                       }: {
    key: number
}) => {
    return (
        <tr key={key} className={"bg-gray-500 animate-pulse h-12"}>
            <th className={"w-8 h-4"}>
                <div className={"place-self-center skeleton h-8 w-6"}></div>
            </th>
            <td className={"my-4 w-8 h-4"}>
                <div className={"mx-auto skeleton h-8 w-3/4"}></div>
            </td>
            <td className={"w-8 h-4"}>
                <div className={"mx-auto skeleton h-8 w-3/4"}></div>
            </td>
            <td className={"w-8 h-4"}>
                <div className={"mx-auto skeleton h-8 w-3/4"}></div>
            </td>
            <td className={"w-8 h-4"}>
                <div className={"mx-auto skeleton h-8 w-3/4"}></div>
            </td>
            <td className={"w-8 h-4"}>
                <div className={"mx-auto skeleton h-8 w-3/4"}></div>
            </td>
            <td className={"w-8 h-4"}>
                <div className={"mx-auto skeleton h-8 w-3/4"}></div>
            </td>
        </tr>)
}