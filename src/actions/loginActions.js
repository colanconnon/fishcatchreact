import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';


export function loginSuccess(user) {
    return { type: types.LOGIN_SUCCESS, user };
}

export function login(username, password) {
    return function (dispatch) {
        return fetch('http://localhost:3005/public/api/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((result) => {
            return result.json();
           
        }).then((result) =>{
            dispatch(loginSuccess({token: result.token, username: result.username}))
        }).catch(error => {
            throw (error);
        });
    };
}