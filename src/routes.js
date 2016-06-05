import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LoginComponent from './components/login/LoginComponent';
import LakePage from './components/Lake/LakePage';
import LogoutPage from './components/Logout/LogoutPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="login" component={LoginComponent} />
        <Route path="lakes" component={LakePage} />
        <Route path="logout" component={LogoutPage} />
    </Route>
);