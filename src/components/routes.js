import Home from "./Home";
import Welcome from "./Welcome";
import Example from "./Example";
import Data from "./Data";
import ErrorPage from "./ErrorPage";
import pageTitle from "../lib/pageTitle";


export default {
    path: "/",
    component: Home,
    indexRoute: {
        component: Welcome
    },
    childRoutes: [
        {
            path: "/example",
            component: Example,
            onEnter: pageTitle("Example Page")
        },
        {
            path: "/data",
            component: Data,
            onEnter: pageTitle("Data thingy")
        },
        {
            path: "/*",
            component: ErrorPage,
            onEnter: pageTitle("404")
        }
    ]
};
