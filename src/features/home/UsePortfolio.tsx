import {useState, useEffect, useMemo, useRef} from 'react';
import {collection, doc, getDoc, getDocs, addDoc, setDoc, getFirestore, Firestore, deleteDoc} from "firebase/firestore";
import {PORTFOLIO_COLLECTION, useFirebaseAuth, USERS_COLLECTION, WATCHLIST_COLLECTION} from "../../core/FirebaseConfig";
import {StockInterval, useStockAPI} from "../../shared/UseStockAPI";
import {User} from 'firebase/auth'
import {getLogoLink, StockTickerData} from "../../shared/StockUtils";
import {useCurrentUser} from "../../core/useCurrentUser";

export type FirebaseStock = {
    ticker: string,
    shares: number
}

export type StockAsset = FirebaseStock & {
    name: string,
    price: number
    percentChange: string
    logoUrl: string
}

export const usePortfolio = (updater: Function) => {
    const {firestoreDB, user, userInitialized} = useFirebaseAuth();
    const {fetchQuotes} = useStockAPI();
    // const {portfolioValue, cashValue, stockValue, updatePortfolio}  = useCurrentUser();

    const firebasePortfolio = useRef<FirebaseStock[]>([]);

    const [portfolio, setPortfolio] = useState<StockAsset[]>([])
    const [portfolioLoading, setPortfolioLoading] = useState(true)

    const parseTickerData = (rawTickerData: any, shares: number): StockAsset => {
        return {
            ticker: rawTickerData.symbol,
            name: rawTickerData.name,
            shares: shares,
            price: rawTickerData.open,
            percentChange: rawTickerData.percent_change,
            logoUrl: getLogoLink(rawTickerData.symbol)
        };
    }

    useEffect(() => {
        if (userInitialized && user !== null) {
            getFirebasePortfolio().then(async (firebasePortfolio) => {
                const tickers: string[] = []
                firebasePortfolio.forEach((asset) => {
                    tickers.push(asset.ticker);
                })
                const portfolioCopy: StockAsset[] = [];

                if (firebasePortfolio.length > 0) {
                    const rawStockData = await fetchQuotes(tickers);
                    console.log(rawStockData);
                    //when there is only one ticker, the data is not stored in an array
                    if (firebasePortfolio.length === 1) {
                        portfolioCopy.push(parseTickerData(rawStockData, firebasePortfolio[0].shares))
                    } else {
                        firebasePortfolio.forEach((tickerData) => {
                            const rawTickerData = rawStockData[tickerData.ticker];
                            portfolioCopy.push(parseTickerData(rawTickerData, tickerData.shares))
                        })
                    }
                }

                setPortfolio(portfolioCopy);
                setPortfolioLoading(false);
            })
        }
    }, []);

    const getFirebasePortfolio = async () => {
        let portfolio: FirebaseStock[] = [];

        return getDocs(collection(firestoreDB as Firestore, USERS_COLLECTION, (user as User).uid, PORTFOLIO_COLLECTION)).then((items) => {
            items.forEach((stock) => {
                const ticker = stock.id;
                const shares = stock.data()?.shares;
                console.log("Fetched " + shares + " shares of " + ticker + " from firestore db");
                portfolio.push({
                    ticker: ticker,
                    shares: shares
                })
            });

            console.log("Finished fetching portfolio from firebase")
            firebasePortfolio.current = portfolio;
            return portfolio;
        }, (err) => {
            console.log("ERROR: failed to fetch firebase portfolio assets....");
            console.log(err);
            return Promise.reject();
        });
    }


    const buyStock = async (stock: StockTickerData, shares: number) => {
        const docRef = doc(collection(firestoreDB as Firestore, USERS_COLLECTION, (user as User).uid, PORTFOLIO_COLLECTION), stock.ticker);
        const existingStock = await getDoc(docRef);

        let numShares = shares;
        if (existingStock.exists()) {
            numShares += existingStock.data().shares;
            console.log("Already own shares of " + stock.ticker + " ticker... buying more")
        }

        return setDoc(docRef, {
            shares: numShares
        }).then(() => {
            //subtract my cash
            console.log("Created entry for " + stock.ticker + " in portfolio and bought " + shares + " shares");
        }).catch((error) => {
            console.error("Error adding document: ", error);
        }).finally(() => {
            // updatePortfolio();
            updater(stock, shares);
        });
    }
    const sellStock = async (stock: StockAsset, shares: number) => {
        // const docRef = doc(collection(firestoreDB as Firestore, USERS_COLLECTION, (user as User).uid, PORTFOLIO_COLLECTION), stock.ticker);
        // const existingStock = await getDoc(docRef);
        //
        // let numShares = shares;
        // if (existingStock.exists()) {
        //     numShares += existingStock.data().shares;
        //     console.log("Already own shares of " + stock.ticker + " ticker... buying more")
        // }
        //
        // return setDoc(docRef, {
        //     shares: numShares
        // }).then(() => {
        //     //subtract my cash
        //     console.log("Created entry for " + stock.ticker + " in portfolio and bought " + shares + " shares");
        // }).catch((error) => {
        //     console.error("Error adding document: ", error);
        // }).finally(() => {
        //     // updatePortfolio();
        //     updater(stock, shares);
        // });
    }

    return {
        buyStock,
        sellStock,
        portfolio,
        portfolioLoading,
    }
}