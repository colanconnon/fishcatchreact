import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
           return Object.assign({}, action.user);
        default:
            return state;
    }
}