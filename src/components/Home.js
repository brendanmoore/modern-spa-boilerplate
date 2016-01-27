import React, { Component } from "react";
import { IndexLink, Link } from "react-router";

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>App Title</h1>
                <ul>
                    <li><IndexLink to="/">Home</IndexLink></li>
                    <li><Link to="/example">Example</Link></li>
                    <li><Link to="/data">Data</Link></li>
                </ul>
                { this.props.children }
            </div>
        );
    }
}
