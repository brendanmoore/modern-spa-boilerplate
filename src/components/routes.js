import Home from "./Home";
import Example from "./Example";
import Welcome from "./Welcome";
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import pageTitle from "../lib/pageTitle";
import AuthComponent from "../lib/AuthComponent";
import { requestLogout } from "../actions";

const WrapWithAuth = AuthComponent("/login");


export default function(store) {
    return [
        {
            path: "/",
            component: Home,
            indexRoute: {
                component: WrapWithAuth(Welcome),
                onEnter: pageTitle("Welcome")
            },
            childRoutes: [
                {
                    path: "/example",
                    component: WrapWithAuth(Example),
                    onEnter: pageTitle("Example")
                },
                {
                    path: "/login",
                    component: Login,
                    onEnter: pageTitle("Login")
                },
                {
                    path: "/logout",
                    onEnter: (nextState, replaceState) => {
                        store.dispatch(requestLogout())
                        replaceState({
                            nextPathname: "/"
                        });
                    }
                },
                {
                    path: "/*",
                    component: ErrorPage,
                    onEnter: pageTitle("404")
                }
            ]
        }

    ];
}
