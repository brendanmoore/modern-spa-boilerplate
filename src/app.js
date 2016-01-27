import "./sass/style.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { Provider } from "react-redux";
import configureStore from "./lib/configureStore";

const store = configureStore(window.__INITIAL_STATE);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById("root"));
