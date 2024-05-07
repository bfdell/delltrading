export const UseStockChart = () => {}

// import {useState, useEffect, useMemo, useRef} from 'react';
// import {collection, doc, getDoc, getDocs, addDoc, setDoc, getFirestore, Firestore, deleteDoc} from "firebase/firestore";
// import {useFirebaseAuth, USERS_COLLECTION, WATCHLIST_COLLECTION} from "../../core/FirebaseConfig";
// import {StockApiParams, fetchCurrentData, useStockAPI, useStockPriceAt} from "../../shared/UseStockAPI";
// import {User} from 'firebase/auth'
//
export type StockChartItem  ={
    ticker: string,
    name: string,
    shares: number
    price: number,
    volume: number
}
//
// export const useStockChart = () => {
//     const {firestoreDB, user, userInitialized} = useFirebaseAuth();
//
//     const firebaseTickersArr = useRef<string[]>([]);
//     const [watchList, setWatchList] = useState<WatchListItem[]>([] as WatchListItem[]);
//
//     //loading states
//     const [watchListLoading, setWatchListLoading] = useState(true);
//     const [fullyLoaded, setFullyLoaded] = useState(false);
//     const [pendingNewTicker, setPendingNewTicker] = useState(false);
//     // const {stockData, stockLoaded, error} = useStockPriceAt('/latest', watchList)
//
//     const getStockChartData = async (ticker: string) => {
//         return fetchCurrentData(ticker, new Date()).then((stonk) => {
//             const stockRow: StockChartItem = {
//                 ticker: stonk.symbol,
//                 name: stonk.name,
//                 price: stonk.eod[0].close,
//             }
//             console.log(stockRow);
//             return stockRow;
//         }).catch(
//             async (err) => {
//                 if (err === "BadStock") {
//                     return Promise.reject(err);
//                 } else if (err.response.status === 429) {
//                     console.log("rate limit reached... will try again in a second ")
//                     const sleeper = new Promise(s => setTimeout(s, 1000))
//                     sleeper.then(() => {
//                         return;
//                     })
//                     return Promise.reject(
//                         new Promise((resolve, reject) => {
//                             setTimeout(() => {
//                                 resolve(appendWatchListTicker(ticker))
//                             }, 1000);
//                         }));
//                 } else {
//                     console.log("FETCH JUST FAILED")
//                     console.log(err);
//                     return Promise.reject(err)
//                 }
//             })
//     }
//
//     const appendWatchListTicker = async (ticker: string) => {
//         return getWatchListTicker(ticker).then((listItem) => {
//             console.log("Appending " + ticker + " to watch list");
//             setWatchList((oldList) => {
//                 if (fullyLoaded) {
//                     setPendingNewTicker(false);
//                     return [listItem, ...oldList]
//                 } else {
//                     setPendingNewTicker(false);
//                     return [...oldList, listItem]
//                 }
//             });
//
//             if (!fullyLoaded && watchList.length + 1 >= firebaseTickersArr.current.length) {
//                 setFullyLoaded(true);
//             }
//         }).catch((err) => {
//             console.log(err);
//             if (err === "BadStock" || err.response.status === 404) {
//                 //if I failed to add a new ticker, remove the one I just added from firebase
//                 removeFirebaseTicker(ticker);
//                 setPendingNewTicker(false);
//             }
//             return Promise.reject(err);
//
//         });
//     }
//
//     useEffect(() => {
//             if (userInitialized && user !== null) {
//                 getFirebaseTickers().then((firebaseTickers) => {
//                         console.log("initialized watch list from database");
//                         const watchListCopy: WatchListItem[] = [];
//                         firebaseTickers?.forEach((ticker, index) => {
//                             getWatchListTicker(ticker).then((listItem: WatchListItem) => {
//                                 watchListCopy.push(listItem);
//
//                                 setWatchList(watchListCopy);
//                                 setWatchListLoading(false);
//
//                                 if (watchListCopy.length >= firebaseTickers?.length) {
//                                     setFullyLoaded(true);
//                                     if (firebaseTickers !== undefined) {
//                                         firebaseTickersArr.current = firebaseTickers;
//                                     }
//                                 }
//
//                             }).catch((err) => {
//                                 console.log("Caught error to prevent further propagation")
//                             });
//                         });
//
//                     }
//                 );
//             }
//
//             //return unmount functions that will update priorities in database
//         }, []
//     )
//     ;
//
//     const getFirebaseTickers = async (): Promise<string[] | undefined> => {
//         let watchListTickers: string[] = [];
//
//         return getDocs(collection(firestoreDB as Firestore, USERS_COLLECTION, (user as User).uid, WATCHLIST_COLLECTION)).then((items) => {
//             items.forEach((item) => {
//                 console.log("Fetched ticker " + item.id + " from firestore db");
//                 watchListTickers.push(item.id)
//             });
//
//             return watchListTickers;
//         }, (err) => {
//             console.log("ERROR: failed to fetch watchlist items....");
//             console.log(err);
//             return Promise.reject(undefined);
//         });
//     }
//
//     const addTicker = async (ticker: string) => {
//         const watchlistRef = collection(firestoreDB as Firestore, USERS_COLLECTION, (user as User).uid, WATCHLIST_COLLECTION);
//         const tickerDoc = doc(watchlistRef, ticker);
//         //todo: implement priority
//         return setDoc(tickerDoc, {}).then((result) => {
//             //todo after we add a new ticker, set that one to true, because we need to fetch the pending ticker
//             console.log("created new watchlist doc for " + ticker);
//             firebaseTickersArr.current.push(ticker);
//             setPendingNewTicker(true);
//
//             return appendWatchListTicker(ticker);
//         }, (err) => {
//             console.log("error occurred while adding new watchlist doc for " + ticker + ".... " + err);
//         });
//     }
//
//     const removeFirebaseTicker = async (ticker: string) => {
//         const watchlistRef = collection(firestoreDB as Firestore, USERS_COLLECTION, (user as User).uid, WATCHLIST_COLLECTION);
//         const tickerDoc = doc(watchlistRef, ticker);
//         //todo: implement priority
//         return deleteDoc(tickerDoc).then((result) => {
//             //todo after we delete a new ticker, remove it from our firebase ticker array
//             console.log("deleted watchlist doc for " + ticker);
//             firebaseTickersArr.current = firebaseTickersArr.current.filter(item => item !== ticker);
//         }, (err) => {
//             console.log("error occurred while removing watchlist doc for " + ticker + ".... " + err);
//         });
//     }
//
//     const deleteTicker = (ticker: string) => {
//         removeFirebaseTicker(ticker).then(() => {
//             //update watch list incase it also conains ticker
//             setWatchList((watchList) => watchList.filter((item) => {
//                 return item.ticker !== ticker
//             }));
//             console.log("removed " + ticker + " from watchlist");
//         });
//     }
//
//
//     return {
//         watchList,
//         watchListLoading,
//         fullyLoaded,
//         pendingNewTicker,
//         getFirebaseTickers,
//         addTicker,
//         deleteTicker
//     };
// }