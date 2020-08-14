import React from "react";
import timezones from "../../data/timezones";
import map from "lodash/map";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withRouter }  from "react-router-dom";

import validateInput from "../../../server/shared/validations/signup";
import TextFieldGroup from "../common/TextFieldGroup";


class SignupFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmaion: "",
            timezone: "",
            errors: {},
            isLoading: false,
            invalid: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if(!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    checkUserExists(e) {
        const field = e.target.name;
        const val = e.target.value;
        if(val !== ""){
            this.props.isUserExists(val).then(res => {
                const errors = this.state.errors;
                let invalid;
                if(res.data.user){
                    invalid = true;
                   errors[field] = "There is user with such "+ field; 
                }
                else{
                    invalid = false;
                    errors[field] = "";
                }
                this.setState({ errors, invalid });
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.userSignupRequest(this.state).then(
                ({ response }) => {
                    this.props.addFlashMessage({
                        type: "success",
                        text: "You signed up successfully. Welcome!"
                    })
                    this.props.history.push("/");
                },
                ({ response }) => this.setState({ errors: response.data, isLoading: false })
            );
        }
    }

    render() {
        const { errors } = this.state;
        const options = map(timezones, (val, key) => 
            <option value={key} key={key}>{val}</option>
        )
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our Online Exam!</h1>
                <TextFieldGroup
                    error={ errors.username}
                    label="Username"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    value={this.state.username}
                    field="username"
                ></TextFieldGroup>
                <TextFieldGroup
                    error={ errors.email}
                    label="Email"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    value={this.state.email}
                    field="email"
                ></TextFieldGroup>
                <TextFieldGroup
                    error={ errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                ></TextFieldGroup>
                <TextFieldGroup
                    error={ errors.passwordConfirmaion}
                    label="Password Confirmation"
                    onChange={this.onChange}
                    value={this.state.passwordConfirmaion}
                    field="passwordConfirmaion"
                ></TextFieldGroup>
                <div className="form-group">
                    <label className="control-label">Timezone</label>
                    <select
                        value={this.state.timezone}
                        onChange={this.onChange}
                        name="timezone"
                        className={classnames("form-control", { "is-invalid": errors.timezone })}>
                        <option value="" disabled>Choose your timezone</option>
                        {options}
                    </select>
                    { errors.timezone && <div className="invalid-feedback">{errors.timezone}</div> }
                </div>
                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid}  className="btn btn-primary">Sign Up</button>
                </div>
            </form>
        )
    }
}

SignupFrom.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
}

export default withRouter(SignupFrom);