import { combineReducers } from 'redux';
import {LOGGED_IN } from '../actions/actionTypes';
import login from './login';

const rootReducer = combineReducers({
    login
})

export default rootReducer ;