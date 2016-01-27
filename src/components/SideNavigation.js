import "./SideNavigation.scss";
import React, { Component } from "react";
import { IndexLink, Link } from "react-router";

export default class SideNavigation extends Component {
    render() {
        return (
            <nav className="app-sidenav">
                <ul>
                    <li><IndexLink className="app-navitem" activeClassName="app-navitem-active" to="/">Home</IndexLink></li>
                    <li><Link className="app-navitem" activeClassName="app-navitem-active" to="/example">Example</Link></li>
                    <li><Link className="app-navitem" activeClassName="app-navitem-active" to="/data">Data</Link></li>
                </ul>
            </nav>
        );
    }
}
