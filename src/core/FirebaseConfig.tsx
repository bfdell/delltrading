import {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {FirebaseAuthUserData, useInitializeServer} from "./UseInitializeServer";
import {Auth, getAuth} from "firebase/auth";
import * as firebase from "firebase/compat";

export const configFirebase = () => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyA9mK3CUOFRflBh20mop_KU3X-Rb6IWh_I",
        authDomain: "delltrading.firebaseapp.com",
        projectId: "delltrading",
        storageBucket: "delltrading.appspot.com",
        messagingSenderId: "859665659124",
        appId: "1:859665659124:web:cddb6a03a1c23595e85aa1",
        measurementId: "G-0C01BVECWY"
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
export const DB_CONSTANTS = {
    USERS_COLLECTION,
    WATCHLIST_COLLECTION
}