import firebase from "firebase/compat";
import {NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import React, {PropsWithChildren, useEffect} from "react";
import {useAuth} from "./UseAuth";

export function RouteGuard({children}: PropsWithChildren) {
    const navigate = useNavigate();
    let location = useLocation();
    const {user, userInitialized} = useAuth();

    useEffect(() => {
        //only activate route guard if user has been set
        if (userInitialized) {
            guardRoute(user, navigate, location.pathname);
        }
    }, [navigate, user]);

    return <>{children}</>;
}

//todo: when you navigate to a bad page, it still shows it for a split second
//todo: For some reason guardRoute is being called 7 times? 3, 1, 3
//todo: maybe make this into its own hook with a routeGuarded boolean state var
//!? Do I even need the route guard component because of this?
export const guardRoute = (user: firebase.UserInfo | null, navigate: NavigateFunction, path: string) => {
    console.log("attempting to access path: " + path);
    if (user === null && (path !== '/login' && path !== '/signup')) {
        //if not authenticated, redirect to /login
        console.log("Can't access site if not logged in, redirecting to login page")
        navigate('/login', {replace: true});
    } else if (user !== null && (path === '/login' || path === '/signup')) {
        //if authenticated, and user tries to access login or signup,
        //redirect to home
        navigate('/', {replace: true});
        console.log("You are already logged in, redirecting to home");
    }
}