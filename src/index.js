import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import '../node_modules/bootswatch/flatly/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';


render(
        <Router history={browserHistory} routes={routes} />
    ,
    document.getElementById('app')
);