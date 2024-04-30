// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {collection, getDocs, getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
    const app = initializeApp(firebaseConfig);
    //const analytics = getAnalytics(app);
    const db = getFirestore(app);

    return [app, db];
}
