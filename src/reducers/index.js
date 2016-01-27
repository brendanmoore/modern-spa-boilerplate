import { routeReducer } from "react-router-redux";
import { combineReducers } from "redux";
import data from "./data";
export default combineReducers({
    testString: (state = "") => state,
    routing: routeReducer,
    data: data
});
