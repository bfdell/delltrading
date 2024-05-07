// import * as firebase from "firebase/compat";
import {useLocation, useNavigate} from "react-router-dom";
import React, {PropsWithChildren, useEffect, useState} from "react";
import {useAuth} from "./UseAuth";

export function RouteGuard({children}: PropsWithChildren) {
    const navigate = useNavigate();
    let location = useLocation();
    const {user, userInitialized} = useAuth();
    const [routeProtected, setRouteProtected] = useState(false);

    //todo: do the thing were it prevents people from leaving routes too
    const guardRoute = () => {
        console.log("attempting to access path: " + location.pathname);
        if (user === null && (location.pathname !== '/login' && location.pathname !== '/signup')) {
            //if not authenticated, redirect to /login
            console.log("Can't access site if not logged in, redirecting to login page")
            navigate('/login', {replace: true});
        } else if (user !== null && (location.pathname === '/login' || location.pathname === '/signup')) {
            //if authenticated, and user tries to access login or signup,
            //redirect to home
            navigate('/', {replace: true});
            console.log("You are already logged in, redirecting to home");
        }
        return true;
    }
    useEffect(() => {
        console.log("Route guard use effect running...");
        setRouteProtected(guardRoute())
    }, [user, location.pathname]);


    //todo: maybe replace the empty fragment with giant loading spinner or skeleton?
    return (routeProtected ? (
        <div className={"mx-auto h-screen w-screen overflow-auto"}>
            {children}
        </div>) : (
        <div></div>));
}