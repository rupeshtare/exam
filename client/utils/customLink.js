
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";


class CustomLink extends React.Component {

    render() {
        const { userRole, condition, dispatch, staticContext, ...rest } = this.props;

        switch (this.props.condition) {
            case "T":
                return this.props.userRole === "T" ? <Link {...rest}>{this.props.children}</Link> : null;
            case "S":
                return this.props.userRole === "S" ? <Link {...rest}>{this.props.children}</Link> : null;
            case "A":
                return this.props.userRole === "A" ? <Link {...rest}>{this.props.children}</Link> : null;
            default:
                return <Link {...rest}>{this.props.children}</Link>;
        }
    }
}

CustomLink.propTypes = {
    userRole: PropTypes.string.isRequired
}


CustomLink.defaultProps = {
    userRole: ""
}

function mapStateToProps(state) {
    return {
        userRole: state.auth.user.role
    };
}

export default connect(mapStateToProps)(CustomLink);