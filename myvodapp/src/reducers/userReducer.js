import {
    USER_REGISTERED,
    LOGOUT_USER
} from '../actions/actionTypes';
import cookie from 'react-cookies';
import { COOKIE_ISLOGGEDIN } from '../constants/AppConstants';

const initialState = {
    isLoggedIn: cookie.load(COOKIE_ISLOGGEDIN) ? true : false
};

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case USER_REGISTERED:
            return {
                ...state,
                ...action.data,
                isLoggedIn: true
            };
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false
            };
        default: return state;
    }
}
