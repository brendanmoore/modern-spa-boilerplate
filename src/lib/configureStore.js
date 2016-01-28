import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import rootReducer from "../reducers";

const _blankMiddleWare = store => next => action => next(action);
const loggerMiddleware = typeof window !== "undefined" ? createLogger() : _blankMiddleWare;

export default function configureStore(initialState, extraMiddleware = []) {
    const middleware = [thunkMiddleware, loggerMiddleware].concat(extraMiddleware);
    const createStoreWithMiddleware = applyMiddleware(
        ...middleware
    )(createStore);
    return createStoreWithMiddleware(rootReducer, initialState)
}
