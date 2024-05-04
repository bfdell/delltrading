import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {doc, Firestore, setDoc} from "firebase/firestore";
import {useFirebaseAuth} from "./FirebaseConfig";

export const useAuth = () => {
    const {firestoreDB, auth, user, userInitialized} = useFirebaseAuth()

    const createUser = async (firstName: string, lastName: string, email: string, password: string) => {
        return createUserWithEmailAndPassword(auth as Auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;

                setDoc(doc(firestoreDB as Firestore, "users", user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    cash: 100000,

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
        return signInWithEmailAndPassword(auth as Auth, email, password)
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
        return signOut(auth as Auth).then(() => {
            // Sign-out successful.
            console.log("signout successful");
        }).catch((error) => {
            // An error happened.
            console.log("error signing out")
        });
    }

    return {auth, user, userInitialized, createUser, signIn, logout};
}
