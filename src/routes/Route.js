import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import LoginService from '../services/api-node';


function RouteWrapper({
    component: Component,
    isPrivate = false,
    path,
    ...rest
}) {


    const isAuth = () => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            return true;
        }
        else {
            return false;
        }

    };

    const signed = isAuth()


    if (!signed && isPrivate) {
        return <Redirect to="/sessions" />;
    }
    if ((signed && path === '/register') || (signed && path === '/sessions')) {
        return <Redirect to="/dashboard" />;
    }

    return <Route {...rest} component={Component} />;
}



export default RouteWrapper;
