import {useState, useEffect, useMemo} from 'react';
import {getAuth} from "firebase/auth";
import {configFirebase} from "./FirebaseConfig";
import * as firebase from 'firebase/compat';
import {Auth} from 'firebase/auth'
import {FirebaseApp} from 'firebase/app'
import {Firestore} from 'firebase/firestore'

export type FirebaseAuthUserData = {
    auth: Auth | null
    user: firebase.default.User | null,
    userInitialized: boolean,
    firebaseApp: FirebaseApp | undefined,
    firestoreDB: Firestore | undefined,
};

//hook for fetching the user at the root at the app, so it's not done multiple times
export const useInitializeServer = (): FirebaseAuthUserData => {
    const {firebaseApp, firestoreDB} = useMemo(() => configFirebase(), []);
    const auth = useMemo(() => getAuth(firebaseApp), []);
    const [user, setUser] = useState(auth.currentUser);
    const [userInitialized, setUserInitialized] = useState(false);

    useEffect(() => {
        // Subscribe to observer and Cleanup on unmount
        console.log("MAKING USER USE EFFECT THE USER____+")
        return auth.onAuthStateChanged((firebaseUser) => {
            console.log("Setting firebase user to")
            console.log(firebaseUser);
            setUser(firebaseUser);
            if (!userInitialized) {
                setUserInitialized(true)
            }
        });
    }, []);

    return {auth, user, userInitialized, firebaseApp, firestoreDB} as FirebaseAuthUserData;
}