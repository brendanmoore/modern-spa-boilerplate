import fetch from "isomorphic-fetch";

export const REQUEST_DATA = "REQUEST_DATA";
export const RECEIVE_DATA = "RECEIVE_DATA";
export const RECEIVE_DATA_ERROR = "RECEIVE_DATA_ERROR";

export function requestData(resource) {
    return {
        type: REQUEST_DATA,
        resource
    }
}

export function receiveData(resource, data) {
    return {
        type: RECEIVE_DATA,
        resource,
        data,
        receivedAt: Date.now()
    }
}

export function receiveDataError(resource, err) {
    return {
        type: RECEIVE_DATA_ERROR,
        resource,
        data: err.message,
        error: true,
        receivedAt: Date.now()
    }
}

export function fetchData(resource) {
    return dispatch => {
        dispatch(requestData(resource))
        return fetch(`/api/${resource}`)
            .then(req => req.json())
            .then(
                json => dispatch(receiveData(resource, json)),
                err => dispatch(receiveDataError(resource, err))
            )
    }
}
