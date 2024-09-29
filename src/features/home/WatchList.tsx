import {PlusIcon} from "@heroicons/react/24/solid";
import {XCircleIcon} from "@heroicons/react/24/solid";
import React, {SetStateAction, useState} from "react";
import {useWatchList} from "./UseWatchList";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import {EllipsisVerticalIcon} from "@heroicons/react/24/outline";
import {PercentChangeFormatter} from "../../shared/StockComponents";
import {StockTickerData} from "../../shared/StockUtils";
import {USDollar} from "../../shared/StockUtils";

//todo: render continuation dots to show there is more to scroll down (only render 6 or 7 items at a time)
//todo: make watch list have a predecfined height/seklotn while loading
export const WatchList = () => {
    const {watchList, watchListLoading, pendingNewTicker, addTicker, deleteTicker} = useWatchList();
    const [formOpen, setFormOpen] = useState(false);
    const [formError, setFormError] = useState(false);
    const [searchDuplicate, setSearchDuplicate] = useState(false);

    const openForm = () => {
        setFormOpen(true);
    }

    const closeForm = () => {
        setFormOpen(false);
        if (formError || searchDuplicate) {
            setFormError(false);
            setSearchDuplicate(false);
        }
    }

    const submitForm = (ticker: string) => {
        ticker = ticker.toUpperCase();

        const duplicate = watchList.find((listItem) => listItem.ticker === ticker);
        console.log(duplicate);
        if (duplicate !== undefined) {
            console.log("attempted to add already existing ticker " + ticker + " to watchList");
            setSearchDuplicate(true);
            setFormError(false);
        } else {
            console.log("submitting watchlist form")
            addTicker(ticker).then(() => {
                closeForm();
            }).catch((err) => {
                // if (err.code === 404) {
                    //if we just failed to add a new invalid ticker display error message
                    setFormError(true);
                    setSearchDuplicate(false);
                // }
            });
        }
    }

    return (
        <div
            className={"flex-none bg-teal-950 py-4 rounded-xl basis-1/4 box-border"}>

            <div className={"flex px-6 flex-row items-center justify-between mb-3"}>
                <span className={"text-2xl"}>Watch List</span>
                <button onClick={openForm} disabled={formOpen} data-tip="Add New"
                        className={"ml-4 tooltip tooltip-bottom btn btn-sm"}>
                    <PlusIcon className={"size-6"}/></button>
            </div>

            {formOpen && <WatchListSearch searchDuplicate={searchDuplicate} formError={formError} closeForm={closeForm}
                                          submitForm={submitForm}/>}


            {/*pending ticker loading sign goes on top, while the regular one is on the bottom*/}
            {pendingNewTicker && (<WatchListLoader/>)}
            <div className={"pl-6"}>
                {watchList.map((listItem, index) => {
                    return <div key={`cardcontainer${index}`}>
                        <WatchListCard deleteTicker={deleteTicker} key={listItem.ticker}
                                       stonk={listItem}/>
                        {index !== watchList.length - 1 &&
                            <div key={"divider" + index} className="mt-0 mb-2 divider"></div>}
                    </div>
                })}
            </div>

            {watchListLoading && <WatchListLoader/>}


            {/*HARD CODED VALUES SO THAT THE API ISNT RUNNING WASTING CALLS WHEN I KNOW IT WORKS*/
            }
            {/*<WatchListCard deleteTicker={() => {} } ticker="GOOGL" name="Alphabet Inc" price={30}/>*/
            }
            {/*<WatchListCard deleteTicker={() => {} } ticker="MSFT" name="Microsoft Corporation" price={40}/>*/
            }
            {/*<WatchListCard deleteTicker={() => {} } ticker="AMZN" name="Amazon.com Inc" price={50}/>*/
            }
            {/*<WatchListCard deleteTicker={() => {} } ticker="TSLA" name="Tesla Inc" price={60}/>*/
            }
            {/*<WatchListCard deleteTicker={() => {} } ticker="NFLX" name="Netflix Inc" price={70}/>*/
            }
            {/*<WatchListCard deleteTicker={() => {} } ticker="FB" name="Meta Platforms Inc" price={80}/>*/
            }
            {/*<WatchListCard deleteTicker={() => {} } ticker="GOOG" name="Nvidia Corporation" price={90}/>*/
            }
            {/*<WatchListCard deleteTicker={() => {} } ticker="NVDA" name="PayPal Holdings Inc" price={100}/>*/
            }
            {/*<WatchListCard deleteTicker={() => {} } ticker="PYPL" name="PayPal Holdings Inc" price={11034.42323}/>*/
            }
        </div>
    )
}

const WatchListSearch = ({closeForm, submitForm, formError, searchDuplicate}: {
    closeForm: SetStateAction<any>,
    submitForm: Function,
    formError: boolean
    searchDuplicate: boolean
}) => {
    const [tickerSearch, setTickerSearch] = useState('');
    const border = formError ? 'border-2 border-solid border-red-600' : 'mt-5'
    return (
        <div className={"px-6"}>
            {formError && (<span className={"mt-5 text-red-600"}>Invalid ticker!</span>)}
            {searchDuplicate && (<span className={"mt-5 text-blue-600"}>Watch list already contains ticker</span>)}
            <div
                className={`${border} mb-5 w-full mx-auto p-2 gap-2 indicator justify-between items-center bg-stone-50 rounded-xl flex flex-row flex-grow-0 flex-none box-border overflow-visible`}>
                <XCircleIcon onClick={closeForm} className={"cursor-pointer indicator-item size-6"}/>


                <input placeholder={"Stock Ticker"} onKeyDown={(keyEvent: React.KeyboardEvent<HTMLInputElement>) => {
                    if (keyEvent.key === "Enter" && tickerSearch !== '') {
                        submitForm(keyEvent.currentTarget.value);
                    }
                }
                } onChange={(e) => {
                    setTickerSearch(e.target.value);
                }} maxLength={20}
                       className={"focus:outline-none text-xl w-4/6 flex-none input input-sm max-w-sm basis-3/4 border-none bg-inherit outline-none text-black rounded-xl"}
                />

                <span
                    className={"absolute right-0 top-0 bottom-0 flex my-auto justify-center justify-self-center content-center items-center flex-none w-fit h-fit max-w-min basis-1/4 box-border text-xl rounded-xl text-black border-solid border-black p-3"}>
                   <PlusCircleIcon onClick={() => {
                       if (tickerSearch != '') {
                           submitForm(tickerSearch)
                       }
                   }}
                                   className="cursor-pointer self-center active:text-gray-300 place-self-center h-fit my-auto flex-none size-6 justify-self-center content-center transition-all ease-in-out hover:translate-x-1.5 hover:size-9 hover:animate-pulse"/>
            </span>
            </div>
        </div>
    );
}

//todo: maybe add icon, percent thing and if it goes up or down
const WatchListCard = ({stonk, deleteTicker}: {
    stonk: StockTickerData
    deleteTicker: Function
}) => {
    return (
        <div className={"flex flex-row items-center justify-between"}>
            <div className={"basis-3/5 flex flex-row items-center gap-3"}>
                <img className={"size-6"} alt={stonk.ticker + " ticker"} src={stonk.logoUrl}/>
                <div>
                    <div> {stonk.ticker}</div>
                    <div className={"text-xs text-gray-500"}> {stonk.name}</div>
                </div>
            </div>

            <div className="flex items-center justify-between flex-row">
                <div>
                    {USDollar.format(stonk.price)}
                    <PercentChangeFormatter percentChange={stonk.percentChange}/>
                </div>
                <div className={"dropdown dropdown-bottom dropdown-end"}>
                    <EllipsisVerticalIcon tabIndex={0} role="button" className={"mx-2 size-6"}/>
                    <ul tabIndex={0}
                        className="cursor-pointer hover:bg-gray-600 transition-all ease-in-out dropdown-content z-[1] menu p-2 px-4 shadow bg-base-100 rounded-box">
                        <li className={"font-bold"} onClick={() => {
                            deleteTicker(stonk.ticker)
                        }}>Delete
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

const WatchListLoader = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className={"text-center align-middle mx-auto animate-spin loading loading-spinner loading-lg"}/>
        </div>
    );
}

