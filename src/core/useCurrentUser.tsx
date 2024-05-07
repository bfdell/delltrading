//todo: Move usename and password stuff to here

import {useEffect, useState} from "react";
import {collection, doc, Firestore, getDoc, setDoc} from "firebase/firestore";
import {PORTFOLIO_COLLECTION, useFirebaseAuth, USERS_COLLECTION} from "./FirebaseConfig";
import {USDollar} from "../shared/UseStockAPI";
import {usePortfolio} from "../features/home/UsePortfolio";
import {StockTickerData} from "../shared/StockUtils";
import {User} from "firebase/auth";

type UserNameInfo = {
    firstName: string,
    lastName: string,
}

export const useCurrentUser = () => {
    const {firestoreDB, user} = useFirebaseAuth();

    const [displayName, setDisplayName] = useState<UserNameInfo>({firstName: '', lastName: ''});
    const [cashValue, setCashValue] = useState<number>(0);
    const [stockValue, setStockValue] = useState<number>(0);
    const [portfolioValue, setPortfolioValue] = useState<number>(0);
    const [portfolioUpdated, setPortfolioUpdated] = useState(false);

    const calculateStockTotal = (): number => {
        let total = 0;
        portfolio.forEach((stockAsset) => {
            total += stockAsset.shares * stockAsset.price;
        })
        return total;
    }

    const updatePortfolio = (stock: StockTickerData, shares: number) => {
        console.log("REFRESHING")
        console.log(stock);
        const cost = stock.price * shares;
        setCashValue(cashValue - cost);
        setUserCash(cashValue - cost).then(() => {
            setPortfolioUpdated(true);
        });
    }

    const setUserCash = async (newCash: number) => {
        const docRef = doc(collection(firestoreDB as Firestore, USERS_COLLECTION), (user as User).uid);
        const currentUser = await getDoc(docRef);

        const data = currentUser.data();
        return setDoc(docRef, {
            cash: newCash
        }, {merge: true}).then(() => {
            console.log("successfully updated my cash")
        }).catch((error) => {
            console.error("Error updating cash ", error);
        });

    }

    const {portfolio, portfolioLoading} = usePortfolio(updatePortfolio);
    useEffect(() => {
        //todo: Create useCache hook to not fetch info that will not change every, time
        if (user != null) {
            //fetch data from document
            const docRef = doc(firestoreDB as Firestore, USERS_COLLECTION, user.uid);
            getDoc(docRef).then((doc) => {
                const userData = doc.data();
                setDisplayName({firstName: userData?.firstName, lastName: userData?.lastName});

                const cashVal = userData?.cash
                console.log("CASH RETRIEVED" + cashVal);
                setCashValue((oldVal) => cashVal);
                const totalStock = calculateStockTotal();
                setStockValue(totalStock);

                //todo: calculate porfolio values based on stock holdings and cashval...
                setPortfolioValue(totalStock + cashVal);
            })
        }


    }, [user, portfolioLoading, portfolioUpdated]);

    return {displayName, cashValue, stockValue, portfolioValue, updatePortfolio};
}