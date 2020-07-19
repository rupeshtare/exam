import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LoginForm from "./LoginForm";
import { login } from "../../actions/authActions"

class LoginPage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <LoginForm login={this.props.login}></LoginForm>
                </div>
            </div>
        );
    }
}


LoginPage.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage);