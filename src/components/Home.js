import "./Home.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import SideNavigation from "./SideNavigation";
import Header from "./Header";

class Home extends Component {
    render() {
        const { isLoggedIn, content, children } = this.props;
        return (
            <div>
                <Header />
                <section className="container">
                    { isLoggedIn && <SideNavigation /> }
                    { content || children }
                </section>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            isLoggedIn: state.auth.loggedIn
        }
    }
)(Home);
