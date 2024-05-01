import React, {useState, useEffect, useMemo} from 'react';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {collection, doc, getDoc, getDocs, setDoc, getFirestore} from "firebase/firestore";
import {getApp} from 'firebase/app';
import {NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";
import {guardRoute} from "./RouteGuard";
// import User = firebase.User;

type UserNameInfo = {
    firstName: string,
    lastName: string,
}
export const useAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useMemo(() => getAuth(), []);
    const firestore = useMemo(() => getFirestore(getApp()), []);

    const [user, setUser] = useState(auth.currentUser);
    const [userInitialized, setUserInitialized] = useState(false);
    const [displayName, setDisplayName] = useState<UserNameInfo>({firstName: '', lastName: ''});
    //todo: Create useCache hook

    useEffect(() => {
        if (user != null) {
            const docRef = doc(firestore, "users", user.uid);
            getDoc(docRef).then((doc) => {
                const names = doc.data();
                setDisplayName({firstName: names?.firstName, lastName: names?.lastName});
            })
        }

        // Cleanup on unmount
        return auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
            setUserInitialized(true)

            //we have another call to guard route to handle case when page is refreshed
            guardRoute(firebaseUser, navigate, location.pathname);
        });

    }, [user, firestore, userInitialized]);

    const createUser = async (firstName: string, lastName: string, email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;

                setDoc(doc(firestore, "users", user.uid), {
                    firstName: firstName,
                    lastName: lastName,

                }).then((result) => {
                    console.log(`set first and last name ${firstName} ${lastName} for new user`)
                }, (err) => {
                    console.log(err)
                })
                // ...
                console.log("user created");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log("CREATE USER ERROR... code: " + errorCode + " message: " + errorMessage);
            });
    }
    const signIn = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("SIGN IN ERROR... code: " + errorCode + " message: " + errorMessage);
            });
    }
    const logout = async () => {
        return signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signout successful");
        }).catch((error) => {
            // An error happened.
            console.log("error signing out")
        });
    }

    return {user, userInitialized, displayName, createUser, signIn, logout};
}
