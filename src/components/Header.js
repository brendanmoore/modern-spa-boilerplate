// In your modules just require the sass for this module
// This has the side effect that a it will be concatenated
// together by webpack into the `style.css`
import "./Header.scss";
import React, { Component } from "react";

export default class Header extends Component {
    render() {
        return (
            <header className="app-header">
                <div className="app-logo">
                    <img src="/img/boilerplate-logo.svg" width="50" height="50" />
                </div>
                <h2 className="app-title">
                    App Title!
                </h2>
            </header>
        );
    }
}
