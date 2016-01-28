import "./Login.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import { triggerLogin } from "../actions";
import Button from "./Button";

class Login extends Component {
    render() {
        const { dispatchLogin } = this.props;
        const submit = (e) => {
            e.preventDefault();
            dispatchLogin(this.user.value, this.pass.value);
        };
        const onClick = submit;
        return (
            <div className="app-login-container">
                <div className="app-login">
                    <form onSubmit={submit} method="post" action="/api/login">
                        <div className="form-control">
                            <label>Email</label>
                            <input type="text" ref={(user) => { this.user = user}} />
                        </div>
                        <div className="form-control">
                            <label>Password</label>
                            <input type="password" ref={(pass) => { this.pass = pass}} />
                        </div>
                        <div className="form-actions">
                            <Button block onClick={onClick}>Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
}


export default connect(
    (state) => {
        return {}
    },
    (dispatch) => {
        return {
            dispatchLogin: (user, pass) => dispatch(triggerLogin(user, pass))
        }
})(Login);