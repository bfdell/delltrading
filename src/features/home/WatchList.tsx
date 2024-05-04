import {PlusIcon} from "@heroicons/react/24/solid";
import {XCircleIcon} from "@heroicons/react/24/solid";
import React, {SetStateAction, useEffect, useState} from "react";
import {useWatchList} from "./UseWatchList";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import {EllipsisHorizontalCircleIcon} from "@heroicons/react/24/solid";
import {USDollar} from "../../shared/UseStockAPI";

//todo: maybe add icon, percent thing and if it goes up or down

//todo: have this update in real time with websockets??
//todo: render continuation dots to show there is more to scroll down (only render 6 or 7 items at a time)
//todo: addItem form isActive variable to keep track
//todo: three option dots on each card to show options
export const WatchList = () => {
    const {watchList, watchListLoading, fullyLoaded, pendingNewTicker, addTicker, deleteTicker} = useWatchList();
    const [formOpen, setFormOpen] = useState(false);
    const [formError, setFormError] = useState(false);
    useEffect(() => {
        console.log("WatchList useEffect running...")
    }, []);

    const openForm = () => {
        setFormOpen(true);
    }

    const closeForm = () => {
        setFormOpen(false);
        if (formError) {
            setFormError(false);
        }
    }

    //todo: remove
    //FAKE METHOD SIGNIATURE SO THAT ERRORS ARENT THROWN WHEN I COMMENT OUT THE HOOK THAT DOES ALL THE API CALLS
    // const addTicker = async (ticker: string) => {
    // }

    const submitForm = (ticker: string) => {
        console.log("submitting watchlist form")
        addTicker(ticker.toUpperCase()).then(() => {
            closeForm();
        }).catch((err) => {
            console.log(err)
            if (err === "BadStock" || err.response.status === 404) {
                //if we just failed to add a new invalid ticker display error message
                setFormError(true);
            }
        });
    }

    //todo: why was there a problems with "muliple elements of the sme key
    return (
        <div
            className={"max-h-screen overflow-y-auto flex-none max-w-full px-6 bg-teal-950 p-4 rounded-xl basis-1/5 box-border"}>
            <div className={"flex flex-row items-center justify-between mb-3"}>
                <span className={"text-2xl"}>Watch List</span>
                <button onClick={openForm} disabled={formOpen} data-tip="Add New"
                        className={"ml-4 tooltip tooltip-bottom btn btn-sm"}>
                    <PlusIcon className={"size-6"}/></button>
            </div>

            {formOpen && <WatchListSearch formError={formError} closeForm={closeForm} submitForm={submitForm}/>}


            {/*pending ticker loading sign goes on top, while the regular one is on the bottom*/}
            {pendingNewTicker && (<WatchListLoader/>)}

            {!watchListLoading ? (watchList.map((listItem, index) => {
                return (<WatchListCard deleteTicker={deleteTicker} key={listItem.ticker} ticker={listItem.ticker}
                                       name={listItem.name}
                                       price={listItem.price}/>);
            })) : <WatchListLoader/>}

            {(!watchListLoading && !fullyLoaded) && <WatchListLoader/>}

            {/*HARD CODED VALUES SO THAT THE API ISNT RUNNING WASTING CALLS WHEN I KNOW IT WORKS*/}
            {/*<WatchListCard deleteTicker={() => {} } ticker="GOOGL" name="Alphabet Inc" price={30}/>*/}
            {/*<WatchListCard deleteTicker={() => {} } ticker="MSFT" name="Microsoft Corporation" price={40}/>*/}
            {/*<WatchListCard deleteTicker={() => {} } ticker="AMZN" name="Amazon.com Inc" price={50}/>*/}
            {/*<WatchListCard deleteTicker={() => {} } ticker="TSLA" name="Tesla Inc" price={60}/>*/}
            {/*<WatchListCard deleteTicker={() => {} } ticker="NFLX" name="Netflix Inc" price={70}/>*/}
            {/*<WatchListCard deleteTicker={() => {} } ticker="FB" name="Meta Platforms Inc" price={80}/>*/}
            {/*<WatchListCard deleteTicker={() => {} } ticker="GOOG" name="Nvidia Corporation" price={90}/>*/}
            {/*<WatchListCard deleteTicker={() => {} } ticker="NVDA" name="PayPal Holdings Inc" price={100}/>*/}
            {/*<WatchListCard deleteTicker={() => {} } ticker="PYPL" name="PayPal Holdings Inc" price={11034.42323}/>*/}
        </div>
    )
}

//todo: error if incorrect ticker appears above?
//todo: deelete item from watchList?
//todo: note about closing on the bottom


//todo: if click is sucessful you also want to close the form
const WatchListSearch = ({closeForm, submitForm, formError}: {
    closeForm: SetStateAction<any>,
    submitForm: Function,
    formError: boolean
}) => {
    const [tickerSearch, setTickerSearch] = useState('');
    const border = formError ? 'border-2 border-solid border-red-600' : 'mt-5'
    return (
        <div>
            {formError && (<span className={"mt-5 text-red-600"}>Invalid ticker!</span>)}
            <div
                className={`${border} mb-5 w-fit p-2 gap-2 indicator justify-between items-center bg-stone-50 rounded-xl flex flex-row flex-grow-0 flex-none box-border overflow-visible`}>
                <XCircleIcon onClick={closeForm} className={"cursor-pointer indicator-item size-6"}/>


                <input onKeyDown={(keyEvent: React.KeyboardEvent<HTMLInputElement>) => {
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
const WatchListCard = ({ticker, name, price, deleteTicker}: {
    ticker: string,
    name: string,
    price: number,
    deleteTicker: Function
}) => {
    return (
        <div className={"mb-2 flex flex-row items-center justify-between"}>
            <div>
                <div> {ticker}</div>
                <div> {name}</div>
            </div>

            <div className="flex items-center justify-between flex-row">
                <div>
                    {USDollar.format(price)}
                </div>
                <div className={"dropdown dropdown-bottom dropdown-end"}>
                    <EllipsisHorizontalCircleIcon tabIndex={0} role="button" className={"ml-2 size-6"}/>
                    <ul tabIndex={0}
                        className="cursor-pointer max-w-sm hover:bg-gray-600 transition-all ease-in-out dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                        <li className={"font-bold"} onClick={() => {
                            deleteTicker(ticker)
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

