import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions";
import Button from "./Button";

class Data extends Component {
    render() {
        const { data, isFetching, lastUpdated, triggerRequest } = this.props;
        const buttonText = isFetching ? "Fetching..." : "Request";
        const onClick = () => triggerRequest(this.input.value);
        return (
            <div>
                <h2>Get Data: <small>Last updated: {lastUpdated}</small></h2>
                <input type="text" ref={(input) => { this.input = input }} />
                <Button disabled={isFetching} onClick={onClick}>{buttonText}</Button>
                <pre>{JSON.stringify(data, null, "  ")}</pre>
            </div>
        )
    }
}

Data.defaultProps = {
    data: null,
    isFetching: false,
    lastUpdated: "never"
};

export default connect(
    (state) => {
        return {
            data: state.data,
            isFetching: state.data.isFetching,
            lastUpdated: state.data.lastUpdated
        };
    },
    (dispatch) => {
        return {
            triggerRequest: resource => dispatch(fetchData(resource))
        };
    }
)(Data);
