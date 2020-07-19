import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter }  from "react-router-dom";
import { addFlashMessage } from "../actions/flashMessages";

export default function(ComposedComponent) {

    class Authenticate extends React.Component {

        UNSAFE_componentWillMount() {
            if(!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: "error",
                    text: "You need to login to access this page"
                });
                this.props.history.push("/");
            }
        }

        UNSAFE_componentWillUpdate(nextProps) {
            if(!nextProps.isAuthenticated) {
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
        addFlashMessage: PropTypes.func.isRequired
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps, { addFlashMessage })(withRouter(Authenticate));
}