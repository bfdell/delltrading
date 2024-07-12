import {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {collection, doc, Firestore, getDoc, getDocs, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {FirebaseAuthUserData, useInitializeServer} from "./UseInitializeServer";
import {Auth, getAuth, User} from "firebase/auth";
import * as firebase from "firebase/compat";

export const configFirebase = () => {
    // Your web app's Firebase configuration
    //todo: add restrictions to api key?!
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSANGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };
    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);
    //const analytics = getAnalytics(firebaseApp);
    const firestoreDB = getFirestore(firebaseApp);

    return {firebaseApp, firestoreDB};
}

//Create a context
export const FirebaseAuthContext = createContext<FirebaseAuthUserData>({userInitialized: false} as FirebaseAuthUserData);

//Create a provider
export const FirebaseAuthProvider = ({children}: PropsWithChildren) => {
    const {firebaseApp, firestoreDB} = useMemo(() => configFirebase(), []);
    const auth = useMemo(() => getAuth(firebaseApp), []);
    const [user, setUser] = useState(auth.currentUser);
    const [userInitialized, setUserInitialized] = useState(false);
    const userData = useMemo(() => {
                return {
                    auth, user, userInitialized, firebaseApp, firestoreDB
                } as FirebaseAuthUserData
            }, [auth, user, userInitialized, firebaseApp, firestoreDB]
        )
    ;


    useEffect(() => {
        // Subscribe to observer and Cleanup on unmount
        console.log("Firebase useEffect running...")
        return auth.onAuthStateChanged((firebaseUser) => {
            console.log("Setting firebase user to...")
            console.log(firebaseUser);
            setUser(firebaseUser);
            if (!userInitialized) {
                setUserInitialized(true)
            }
        });
    }, []);

    console.log("About to render FirebaseAuthProvider...\t userInitialized: " + userData.userInitialized)
    return (
        <FirebaseAuthContext.Provider value={userData}>
            {userData.userInitialized && (children)}
        </FirebaseAuthContext.Provider>
    );
};

// Custom hook to access the Firestore instance that doesn't just create a new instance everytime
export const useFirebaseAuth = () => {
    const firebaseData = useContext(FirebaseAuthContext);
    if (!firebaseData) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return firebaseData;
};


//todo make constanst for every table/collection name
export const USERS_COLLECTION: string = "users";
export const WATCHLIST_COLLECTION: string = "watchlist"
export const PORTFOLIO_COLLECTION: string = "portfolio"

const API_COLLECTION: string = "api_keys"

export const DB_CONSTANTS = {
    USERS_COLLECTION,
    WATCHLIST_COLLECTION,
    PORTFOLIO_COLLECTION,
}

export type KeyType = "stocks"
export const useAPIKey = (keyType: KeyType) => {
    const {firestoreDB} = useFirebaseAuth();
    //
    // useEffect(() => {
    //     getKey(keyType).;
    // }, []);

    const getKey = async (keyType: KeyType): Promise<string> => {
        return getDoc(doc(firestoreDB as Firestore, API_COLLECTION, keyType)).then((doc) => {
            console.log("fetched stock market api key")
            return doc.data()?.key
        }, () => {
            console.log("unable to fetch stock market api key")
        });
    }

    return {getKey}
}