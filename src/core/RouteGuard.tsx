// import * as firebase from "firebase/compat";
import {useLocation, useNavigate} from "react-router-dom";
import React, {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {useAuth} from "./UseAuth";
import {UserDataContext, UserDataProvider} from "./useCurrentUser";

export function RouteGuard({children}: PropsWithChildren) {
    const navigate = useNavigate();
    let location = useLocation();
    const {authorize, logout} = useAuth();
    const [routeProtected, setRouteProtected] = useState(false);

    //todo: do the thing were it prevents people from leaving routes too
    const guardRoute = useCallback(() => {
        console.log("attempting to access path: " + location.pathname);
        authorize().then((res) => {
            if (location.pathname === '/login' || location.pathname === '/signup') {
                //if authenticated, and user tries to access login or signup,
                //redirect to home
                navigate('/', {replace: true});
                console.log("You are already logged in, redirecting to home");
            }
        })
            .catch((error) => {
                if (location.pathname !== '/login' && location.pathname !== '/signup') {
                    //if not authenticated, redirect to /login
                    console.log("Can't access site if not logged in, redirecting to login page")
                    logout()
                }
            })
            .finally(() => {
                setRouteProtected(true)
            })

    }, [authorize, location.pathname, logout, navigate])

    useEffect(() => {
        console.log("Route guard use effect running...");
        guardRoute()
    }, [guardRoute, location.pathname]);


    //todo: maybe replace the empty fragment with giant loading spinner or skeleton?
    return (routeProtected ? (
        <div className={"mx-auto h-screen w-screen overflow-auto"}>
            {location.pathname === '/login' || location.pathname === '/signup' ? children :
                <UserDataProvider>{children}</UserDataProvider>}
        </div>) : (
        <div></div>));
}