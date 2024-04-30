import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Login} from "./features/authentication/Login";
import {Home} from "./features/home/Home";
import {SignUp} from "./features/authentication/SignUp";
import {Auth0Provider, useAuth0} from '@auth0/auth0-react';
import Portfolio, {Graph, MyStockList} from "./features/portfolio/Portfolio";
import Test from "./Test";

//todo: Create error boundary element
//todo: set up route guards
const router = createBrowserRouter([
    {
        path: 'login',
        element: <Login/>
    },
    {
        path: 'signup',
        element: <SignUp/>
    },
    {
        path: '',
        element: <Home/>,
    },
    {
        path: 'home',
        element: <Home/>
    },
    {
        path: 'portfolio',
        element: <div>PORTFOLIO PENDING</div>
    },
    {
        path: 'simulations',
        element: <div>SIMULATIONS PENDING</div>
    },
    {
        path: 'compare',
        element: <div>COMPARE PENDING</div>
    },
    {
        path: 'profile',
        element: <div>PROFILE PENDING</div>
    },
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <Auth0Provider
                domain="dev-7mneergajidugmb8.us.auth0.com"
                clientId="1PR4iSFjNdgeHW8L5nIj0CvCgQFs0CeJ"
                authorizationParams={{
                    redirect_uri: window.location.origin
                }}
            >
                {/*<RouterProvider router={router}/>*/}
                {/*<Portfolio width={600} height={600}/>*/}
                {/*<MyStockList/>*/}
                <Graph/>
                <Test width={600} height={600}/>
            </Auth0Provider>
            {/*<App/>*/}
        </DevSupport>
    </React.StrictMode>
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
