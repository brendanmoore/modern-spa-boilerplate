import "./Home.scss";
import React, { Component } from "react";
import Header from "./Header";
import SideNavigation from "./SideNavigation";

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <section className="container">
                    <SideNavigation />
                    { this.props.children }
                </section>
            </div>
        );
    }
}
