import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { addFlashMessage } from "../actions/flashMessages";

export default function (ComposedComponent, role) {

    class Authenticate extends React.Component {

        constructor(props) {
            super(props);
            this.checkAuthenticated();
        }

        checkAuthenticated() {
            if (!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: "error",
                    text: "You need to login to access this page."
                });
                this.props.history.push("/");
            } else if (role !== this.props.userRole) {
                this.props.addFlashMessage({
                    type: "error",
                    text: "You dont have permission to access this page."
                });
                this.props.history.push("/");
            }
        }

        componentDidUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.props.history.push("/login");
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props}></ComposedComponent>
            )
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        userRole: PropTypes.string.isRequired,
        addFlashMessage: PropTypes.func.isRequired
    }

    Authenticate.defaultProps = {
        userRole: ""
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            userRole: state.auth.user.role
        };
    }

    return connect(mapStateToProps, { addFlashMessage })(withRouter(Authenticate));
}