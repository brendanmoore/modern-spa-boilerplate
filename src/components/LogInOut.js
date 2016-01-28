import React from "react";
import Button from "./Button";
import { connect } from "react-redux";
import { routeActions } from "react-router-redux";

function LogInOut({ isLoggedIn, trigger, pathname }) {
    if (pathname === "/login") {
        return <span />;
    }
    const text = isLoggedIn ? "Logout" : "Login";
    const onClick = () => trigger(isLoggedIn ? "/logout" : "/login");
    return (
        <Button className="btn-header" onClick={onClick}>{ text }</Button>
    );
}

export default connect((state) => {
    const location = state.routing.location;
    return {
        isLoggedIn: state.auth.loggedIn,
        pathname: location && location.pathname
    }
}, (dispatch) => {
    return {
        trigger: (url) => {
            dispatch(routeActions.push(url));
        }
    }
})(LogInOut);

