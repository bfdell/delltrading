// Import the necessary modules from auth0.js
import * as auth0 from '@auth0/auth0-spa-js';
// // Create a new instance of Auth0Client
// const auth0Client = new auth0.WebAuth({
//     domain: 'your-auth0-domain',
//     clientID: 'your-auth0-client-id',
// });
//
// // Example usage: initiate login
// auth0Client.authorize({
//     responseType: 'token id_token',
//     redirectUri: 'http://localhost:3000/callback',
//     scope: 'openid profile email',
// });
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);