import {useState, useEffect, useRef} from 'react';
import {collection, doc, getDocs, setDoc, Firestore, deleteDoc} from "firebase/firestore";
import {useFirebaseAuth, USERS_COLLECTION, WATCHLIST_COLLECTION} from "../../core/FirebaseConfig";
import {useStockAPI} from "../../shared/UseStockAPI";
import {User} from 'firebase/auth'
import {StockTickerData, parseTickerData} from "../../shared/StockUtils";

export const useWatchList = () => {
    const {firestoreDB, user, userInitialized} = useFirebaseAuth();
    const {fetchQuotes} = useStockAPI();

    const firebaseTickersArr = useRef<string[]>([]);
    const [watchList, setWatchList] = useState<StockTickerData[]>([] as StockTickerData[]);

    //loading states
    const [watchListLoading, setWatchListLoading] = useState(true);
    const [pendingNewTicker, setPendingNewTicker] = useState(false);

    useEffect(() => {
            if (userInitialized && user !== null) {
                getFirebaseTickers().then(async (firebaseTickers) => {
                        const rawStockData = await fetchQuotes(firebaseTickers);

                        const watchListCopy: StockTickerData[] = [];
                        firebaseTickers.forEach((tickerStr) => {
                            const rawTickerData = rawStockData[tickerStr];
                            watchListCopy.push(parseTickerData(rawTickerData));
                        })

                        setWatchList(watchListCopy)
                        setWatchListLoading(false);
                    }
                );
            }
        }, []
    );

    const getFirebaseTickers = async (): Promise<string[]> => {
        let watchListTickers: string[] = [];

        return getDocs(collection(firestoreDB as Firestore, USERS_COLLECTION, (user as User).uid, WATCHLIST_COLLECTION)).then((items) => {
            items.forEach((item) => {
                console.log("Fetched ticker " + item.id + " from firestore db");
                watchListTickers.push(item.id)
            });

            console.log("initialized watch list from database");
            firebaseTickersArr.current = watchListTickers;
            return watchListTickers;
        }, (err) => {
            console.log("ERROR: failed to fetch watchlist items....");
            console.log(err);
            return [];
        });
    }

    const addTicker = async (ticker: string) => {
        //if list is loading, I don't want two loading spinners
        if (!watchListLoading) {
            setPendingNewTicker(true);
        }

        const rawStockData = await fetchQuotes([ticker]);
        if (rawStockData.code === 404) {
            setPendingNewTicker(false);
            return Promise.reject(rawStockData);
        }

        const watchlistRef = collection(firestoreDB as Firestore, USERS_COLLECTION, (user as User).uid, WATCHLIST_COLLECTION);
        const tickerDoc = doc(watchlistRef, ticker);
        setDoc(tickerDoc, {}).then((result) => {
            console.log("created new watchlist doc for " + ticker);
            firebaseTickersArr.current.push(ticker);

            setWatchList((oldList) => [parseTickerData(rawStockData), ...oldList]);
            setPendingNewTicker(false);
        }, (err) => {
            console.log("error occurred while adding new watchlist doc for " + ticker + ".... " + err);
        });
    }

    const removeFirebaseTicker = async (ticker: string) => {
        const watchlistRef = collection(firestoreDB as Firestore, USERS_COLLECTION, (user as User).uid, WATCHLIST_COLLECTION);
        const tickerDoc = doc(watchlistRef, ticker);
        return deleteDoc(tickerDoc).then((result) => {
            //after we delete a new ticker, remove it from our firebase ticker array
            console.log("deleted watchlist doc for " + ticker);
            firebaseTickersArr.current = firebaseTickersArr.current.filter(item => item !== ticker);
        }, (err) => {
            console.log("error occurred while removing watchlist doc for " + ticker + ".... " + err);
        });
    }

    const deleteTicker = (ticker: string) => {
        removeFirebaseTicker(ticker).then(() => {
            //update watch list incase it also conains ticker
            setWatchList((watchList) => watchList.filter((item) => {
                return item.ticker !== ticker
            }));
            console.log("removed " + ticker + " from watchlist");
        });
    }

    return {
        watchList,
        watchListLoading,
        pendingNewTicker,
        addTicker,
        deleteTicker
    };
}