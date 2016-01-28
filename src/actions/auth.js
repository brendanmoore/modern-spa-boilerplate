import fetch from "isomorphic-fetch";
import { routeActions } from "react-router-redux";

export const SHOULD_LOGIN = "SHOULD_LOGIN";
export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const REQUEST_LOGOUT = "REQUEST_LOGOUT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export function shouldLogin() {
    return {
        type: SHOULD_LOGIN
    };
}

export function requestLogin(user, pass) {
    return {
        type: REQUEST_LOGIN,
        user,
        pass
    };
}

export function requestLogout() {
    return {
        type: REQUEST_LOGOUT
    };
}

export function loginSuccess(userData) {
    return {
        type: LOGIN_SUCCESS,
        userData
    };
}

export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        error: error
    }
}

function checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res
    } else {
        const error = new Error(res.statusText)
        error.res = res
        throw error
    }
}


export function triggerLogin(user, pass) {
    return dispatch => {
        dispatch(requestLogin(user, pass))
        return fetch("/api/login", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user,
                pass
            })
        })
        .then(checkStatus)
        .then(res => res.json())
        .then(json => {
            dispatch(loginSuccess(json))
            return dispatch(routeActions.push("/"))
        })
        .catch(err => {
            return dispatch(loginFailure(err))
        })
    }
}
