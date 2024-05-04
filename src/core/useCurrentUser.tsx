//todo: Move usename and password stuff to here

import {useEffect, useState} from "react";
import {doc, Firestore, getDoc} from "firebase/firestore";
import {useFirebaseAuth, USERS_COLLECTION} from "./FirebaseConfig";
import {USDollar} from "../shared/UseStockAPI";

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

    const calculateStockTotal = (): number => {
        return 0;
    }
    useEffect(() => {
        //todo: Create useCache hook to not fetch info that will not change every, time
        if (user != null) {
            //fetch data from document
            const docRef = doc(firestoreDB as Firestore, USERS_COLLECTION, user.uid);
            getDoc(docRef).then((doc) => {
                const userData = doc.data();
                setDisplayName({firstName: userData?.firstName, lastName: userData?.lastName});

                const cashVal = userData?.cash
                setCashValue(cashVal);
                const totalStock = calculateStockTotal();
                setStockValue(totalStock);

                //todo: calculate porfolio values based on stock holdings and cashval...
                setPortfolioValue(totalStock + cashVal);
            })
        }


    }, [user]);

    return {displayName, cashValue, stockValue, portfolioValue};
}