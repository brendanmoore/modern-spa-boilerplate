import "./Button.scss";
import React, { Component } from "react";
import cx from "classnames";

export default class Button extends Component {
    render() {
        const { onClick, disabled, block, className } = this.props;
        const cls = cx("btn", {
            "btn-block": block
        }, className);
        return (
            <button className={cls} disabled={disabled} onClick={onClick}>{this.props.children}</button>
        );
    }
}
