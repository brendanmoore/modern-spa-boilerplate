import React, { Component } from "react";
import { connect } from "react-redux";

class Example extends Component {

    render() {
        const { testString } = this.props;
        return (
            <div>{ testString }</div>
        );
    }
}

Example.defaultProps = {
    testString: "This is a FRONTEND String!"
}

export default connect(
    (state) => {
        return {
            testString: state.testString
        }
    },
    (dispatch) => {
        return {};
    }
)(Example);
