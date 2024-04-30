import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Login} from "./features/authentication/Login";
import {SignUp} from "./features/authentication/SignUp";
import {NavBar} from "./shared/NavBar";

function App() {


    // TODO: FIX FLEX PROBLEM WITH GOING TO NEXT COLUMN
    //Conditional render of nav bar if logged in
    return (
        <div>
            <NavBar/>
            <Login/>
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
