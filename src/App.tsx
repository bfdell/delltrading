import React, {PropsWithChildren, useRef} from 'react';
import './App.css';
import {Login} from "./features/authentication/Login";
import {SignUp} from "./features/authentication/SignUp";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {Home} from "./features/home/Home";
import {Profile} from "./features/profile/Profile";
import {Compare} from "./features/compare/Compare";
import {Simulations} from "./features/simulations/Simulations";
import {Portfolio} from "./features/portfolio/Portfolio";
import {RouteGuard} from "./core/RouteGuard";
import {StockGraph, TestGraph} from "./shared/StockGraphs";

import {FirebaseAuthProvider} from "./core/FirebaseConfig";

function App() {
//todo: Create error boundary element
    const router = createBrowserRouter([
        {
            path: 'login',
            element: (<RouteGuard><Login/></RouteGuard>)
        },
        {
            path: 'signup',
            element: (<RouteGuard><SignUp/></RouteGuard>)
        },
        {
            path: '',
            element: (<RouteGuard><Home/></RouteGuard>)
        },
        {
            path: 'home',
            element: (<RouteGuard><Home/></RouteGuard>)
        },
        {
            path: 'portfolio',
            element: (<RouteGuard><Portfolio/></RouteGuard>)
        },
        {
            path: 'simulations',
            element: (<RouteGuard><Simulations/></RouteGuard>)
        },
        {
            path: 'compare',
            element: (<RouteGuard><Compare/></RouteGuard>)
        },
        {
            path: 'profile',
            element: (<RouteGuard><Profile/></RouteGuard>)
        },
        //TODO:REMOVE ...USED FOR TESTING
        {
            path: 'test',
            element: (<RouteGuard><TestGraph width={500} height={500}/></RouteGuard>)
        }
    ])

    return (
        <div>
            <FirebaseAuthProvider>
                <RouterProvider router={router}/>
            </FirebaseAuthProvider>
        </div>
    );
}

export default App;
