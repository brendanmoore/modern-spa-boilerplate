// In your modules just require the sass for this module
// This has the side effect that a it will be concatenated
// together by webpack into the `style.css`
import "./Header.scss";
import React, { Component } from "react";
import LogInOut from "./LogInOut";

export default class Header extends Component {
    render() {
        return (
            <header className="app-header">
                <h2 className="app-title">App Title</h2>
                <div className="app-header-auth">
                    <LogInOut />
                </div>
            </header>
        );
    }
}
