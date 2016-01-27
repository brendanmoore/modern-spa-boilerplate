import { REQUEST_DATA, RECEIVE_DATA, RECEIVE_DATA_ERROR } from "../actions";

export default function data(state = {
    isFetching: false,
    data: {},
    lastUpdated: -1
}, action) {
    switch (action.type) {
        case REQUEST_DATA:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_DATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data,
                error: action.error,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}
