import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Timer extends React.Component {
    render() {
        const timer = this.props.timer;
        return (
            <div className="timer">{timer}</div>
        )
    }
}

Timer.propTypes = {
    timer: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        timer: state.timer
    }
}

export default connect(mapStateToProps, {})(Timer);