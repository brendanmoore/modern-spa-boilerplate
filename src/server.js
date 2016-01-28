// Server modules
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import { readFileSync } from "fs";
import path from "path";
// Load the API partition [./api/index.js]
import api from "./api";

// View Modules.
import React from "react";
import { renderToString } from "react-dom/server";
import configureStore from "./lib/configureStore";
import { Provider } from "react-redux";
import { match, RouterContext } from "react-router";
import routes from "./components/routes";
import ErrorPage from "./components/ErrorPage";

// Get going!
const app = express();
const appTitle = "App Title Server!";
const STATIC_PATH = path.resolve(__dirname, "../www");

// Set up middleware:
// Read: application/json
app.use(bodyParser.json());
// Read: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Read cookies
app.use(cookieParser());
// Enable gzip/deflate, could be disabled here
// and used in a reverse proxy instead
app.use(compression());
// Mount our "api" handler here:
// This is good practice to seperate concerns so you could easily add versions
// to your api such as "/api/v1", "/api/v2" etc.
app.use("/api", api);

// cache the indexPage...
const idxHtml = readFileSync(path.resolve(STATIC_PATH, "./index.html"), "utf-8");
const renderFullPage = (html = "<!--test-->", initialState = {}) => {
    // Make sure we clone it...
    let page = idxHtml.slice(0);
    // Add the html string
    page = page.replace("<!--html-->", html);
    // Serialise our initial state and add it to the page
    page = page.replace(
        "<!--initial_state-->",
        `<script>window.__INITIAL_STATE=${JSON.stringify(initialState)}</script>`
    );
    return page;
}

// Passthrough static file requests to correct folder [./www]
app.use(express.static(STATIC_PATH, {
    // Do allow access to the index.html, we override with `renderFullPage()`
    index: false
}));

// Catch all remaining GET requests and pass through our [./components/routes]
app.get("*", (req, res) => {

    // A Dummy initial state.
    const initialState = {};
    // Set up store
    const store = configureStore(initialState);
    // Using the [match, RouterContext] instead of [Router] because it requires
    // a browser.
    match({ routes: routes(store), location: req.url }, (err, redirect, props) => {
        if (err) {
            // Something must have crashed here?
            res.send(500).send(err.message);
        } else if (redirect) {
            // Is there a redirect?
            res.redirect(302, redirect.pathname + redirect.search);
        } else if (props) {
            // Detect if we have hit our own catch all inside [./components/routes]
            // and set the correct response code.
            const code = props.components.indexOf(ErrorPage) !== -1 ? 404 : 200;
            // User ReactDOM to render our app to string.
            const html = renderToString(
                <Provider store={store}>
                    <RouterContext {...props} />
                </Provider>
            );
            // Add the rendered components and initialState to the index.html
            // and send to the client
            res.status(code).send(renderFullPage(html, initialState));
        } else {
            //If the catch-all is removed from routes it will fallback here.
            res.status(404).send("Not Found!");
        }
    });
});

// Start the UI/API server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`${appTitle} listening on port ${PORT}!`);
});
