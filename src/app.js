// This creates the CSS entrypoint for webpack.
import "./sass/style.scss";
// JS modules
import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import routes from "./components/routes";
import { Provider } from "react-redux";
import { syncHistory } from "react-router-redux";
import configureStore from "./lib/configureStore";


const store = configureStore(window.__INITIAL_STATE,
    // Add redux to the router!
    syncHistory(browserHistory)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes(store)} />
    </Provider>,
document.getElementById("root"));
