import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import api from "./api";
import { readFileSync } from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import reducers from "./reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { match, RouterContext } from "react-router";
import routes from "./components/routes";
import ErrorPage from "./components/ErrorPage";


const app = express();
const appTitle = "App Title Server!";
const STATIC_PATH = path.resolve(__dirname, "../www");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use("/api", api);

//cache the indexPage...
const idxHtml = readFileSync(path.resolve(STATIC_PATH, "./index.html"), "utf-8");
const renderFullPage = (html = "<!--test-->", initialState = {}) => {
    //Make sure we clone it...
    let page = idxHtml.slice(0);
    //Add the html string
    page = page.replace("<!--html-->", html);
    //Serialise our initial state and add it to the page
    page = page.replace(
        "<!--initial_state-->",
        `<script>window.__INITIAL_STATE=${JSON.stringify(initialState)}</script>`
    );
    return page;
}

app.use(express.static(STATIC_PATH, {
    index: false
}));

app.get("*", (req, res) => {
    console.log(`Rendering: ${req.url}`);
    const initialState = {
        testString: `This is a BACKEND String! ${Date.now()}`
    };
    const store = createStore(reducers, initialState);
    match({ routes, location: req.url }, (err, redirect, props) => {
        if (err) {
            res.send(500).send(err.message);
        } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search);
        } else if (props) {
            const code = props.components.indexOf(ErrorPage) !== -1 ? 404 : 200;

            const html = renderToString(
                <Provider store={store}>
                    <RouterContext {...props} />
                </Provider>
            );
            res.status(code).send(renderFullPage(html, initialState));
        } else {
            //This needs to be handled better
            res.status(404).send("Not Found!");
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`${appTitle} listening on port ${PORT}!`);
});
