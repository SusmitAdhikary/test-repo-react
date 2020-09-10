import {LOGGED_IN } from '../actions/actionTypes';

export const initialState = {
    error: null,
    response: null,
    loading: false,
}

const AuthReducer = (state = initialState, action) => {
    const {type, value} = action;
    console.log('IN Dispatcher' + type + value);
    switch(type){
        case LOGGED_IN : 
            return{
                ...state,
                response: value,
                error: null,
                loading: false
            }
        default:
            return{
                ...state
            }
    }
}

export default AuthReducer;