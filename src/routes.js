import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LoginComponent from './components/login/LoginComponent';
import LakePage from './components/Lake/LakePage';
import ViewLakePage from './components/Lake/ViewLakePage';
import LogoutPage from './components/Logout/LogoutPage';
import NewLakePage from './components/Lake/NewLakePage';
export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="login" component={LoginComponent} />
        <Route path="lakes" component={LakePage} />
        <Route path="logout" component={LogoutPage} />
        <Route path="lake/:id" component={ViewLakePage} />
        <Route path="newlake" component={NewLakePage} />     
     

    </Route>
);