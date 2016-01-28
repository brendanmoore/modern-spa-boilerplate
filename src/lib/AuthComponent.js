import React, { Component } from "react";
import { connect } from "react-redux";
import { routeActions } from "react-router-redux";

export default function authComponent(redirectPath) {
    return function wrap(TargetComponent) {
        class AuthComponent extends Component {
            isAuthorised(authData) {
                return authData.loggedIn
            }

            ensureAuth(props) {
                const { replace, auth } = props
                if (!this.isAuthorised(auth)) {
                    replace({
                        pathname: redirectPath
                    });
                }
            }

            componentWillMount() {
                this.ensureAuth(this.props);
            }

            componentWillReceiveProps(nextProps) {
                this.ensureAuth(nextProps);
            }

            render() {
                const { auth } = this.props;
                if (this.isAuthorised(auth)) {
                    return <TargetComponent { ...this.props }/>
                } else {
                    return <div />;
                }
            }
        }
        AuthComponent.displayName = `${TargetComponent.displayName}AuthWrapper`;
        return connect(state => {
            return {
                auth: state.auth
            }
        }, { replace: routeActions.replace })(AuthComponent);
    }
}
