// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import login from './loginReducer';

 
 
const rootReducer = combineReducers({
    login
});
 
 export default rootReducer;