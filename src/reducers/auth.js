import {
    SHOULD_LOGIN,
    REQUEST_LOGIN,
    REQUEST_LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from "../actions";

export default function auth(state = {
    auth: {
        loggedIn: false
    }
}, action) {
    switch (action.type) {
        case SHOULD_LOGIN:
            return state;
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                loggingIn: true,
                loggedIn: false,
                error: null
            });
        case REQUEST_LOGOUT:
            return Object.assign({}, state, {
                loggingIn: false,
                loggedIn: false,
                error: null
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loggingIn: false,
                loggedIn: true,
                user: action.userData
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                loggingIn: false,
                loggedIn: false,
                error: action.error
            });
        default:
            return state;
    }
}
