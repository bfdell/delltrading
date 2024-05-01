import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Login} from "./features/authentication/Login";
import {SignUp} from "./features/authentication/SignUp";
import {createBrowserRouter, RouterProvider, useNavigate, useLocation} from "react-router-dom";

import {Home} from "./features/home/Home";
// import {Graph} from "./features/portfolio/Portfolio";
// import Test from "./Test";
import {Profile} from "./features/profile/Profile";
import {Compare} from "./features/compare/Compare";
import {Simulations} from "./features/simulations/Simulations";
import {Portfolio} from "./features/portfolio/Portfolio";
import {RouteGuard} from "./core/RouteGuard";

function App() {
//todo: Create error boundary element
    //todo: Conditional render of nav bar if logged in
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
    ])

    return (
        <div>
            <RouterProvider router={router}/>
            {/*<NavBar/>*/}
            {/*<Login/>*/}
            {/*<Graph/>*/}
            {/*<Portfolio width={600} height={600}/>*/}
            {/*<MyStockList/>*/}
            {/*<Test width={600} height={600}/>*/}
            {/*<SignUp />*/}
        </div>
        // <div className="App">
        // <header className="App-header">
        // <img src={logo} className="App-logo" alt="logo"/>
        // <p>
        // Edit <code>src/App.tsx</code> and save to reload.
        // </p>
        // <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>
    );
}

export default App;
