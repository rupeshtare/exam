import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { userSignupRequest, isUserExists } from "../../actions/signupActions";
import { addFlashMessage } from "../../actions/flashMessages";

import SignupForm from "./SignupForm";

class SignupPage extends React.Component {
    render() {
        const { userSignupRequest, addFlashMessage, isUserExists } = this.props;
        return (
            <div className="row justify-content-md-center">
                <div className="col col-md-4">
                    <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} isUserExists={isUserExists} />
                </div>
            </div>
        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage, isUserExists } )(SignupPage);