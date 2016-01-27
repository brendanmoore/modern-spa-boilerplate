import "./Button.scss";
import React, { Component } from "react";

export default class Button extends Component {
    render() {
        const { onClick, disabled } = this.props;
        return (
            <button className="btn" disabled={disabled} onClick={onClick}>{this.props.children}</button>
        );
    }
}
