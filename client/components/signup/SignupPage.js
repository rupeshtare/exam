import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { userSignupRequest } from "../../actions/signupActions";

import SignupForm from "./SignupForm";

class SignupPage extends React.Component {
    render() {
        const { userSignupRequest } = this.props;
        return (
            <div className="row justify-content-md-center">
                <div className="col col-md-4">
                    <SignupForm userSignupRequest={userSignupRequest} />
                </div>
            </div>
        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest} )(SignupPage);