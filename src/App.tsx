import React from 'react';
import './App.css';
import {Login} from "./features/authentication/Login";
import {SignUp} from "./features/authentication/SignUp";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./features/home/Home";
import {Profile} from "./features/profile/Profile";
import {Compare} from "./features/compare/Compare";
import {Simulations} from "./features/simulations/Simulations";
import {RouteGuard} from "./core/RouteGuard";
import {TestGraph} from "./shared/StockGraphs";
import {Portfolio} from "./features/portfolio/Portfolio";

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
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;