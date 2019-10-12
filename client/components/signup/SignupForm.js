import React from "react";
import timezones from "../../data/timezones";
import map from "lodash/map";
import PropTypes from "prop-types";
import classnames from "classnames";

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
            isLoading: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        this.setState({ errors: {}, isLoading: true });
        e.preventDefault();
        this.props.userSignupRequest(this.state).then(
            ({ response }) => console.log(response),
            ({ response }) => this.setState({ errors: response.data, isLoading: false })
        );
    }

    render() {
        const { errors } = this.state;
        const options = map(timezones, (val, key) => 
            <option value={key} key={key}>{val}</option>
        )
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our Exam!</h1>
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        className={classnames("form-control", { "is-invalid": errors.username })}>
                    </input>
                    { errors.username && <div className="invalid-feedback">{errors.username}</div> }
                </div>
                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className={classnames("form-control", { "is-invalid": errors.email })}>
                    </input>
                    { errors.email && <div className="invalid-feedback">{errors.email}</div> }
                </div>
                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className={classnames("form-control", { "is-invalid": errors.password })}>
                    </input>
                    { errors.password && <div className="invalid-feedback">{errors.password}</div> }
                </div>
                <div className="form-group">
                    <label className="control-label">Password Confirmation</label>
                    <input
                        value={this.state.passwordConfirmaion}
                        onChange={this.onChange}
                        type="password"
                        name="passwordConfirmaion"
                        className={classnames("form-control", { "is-invalid": errors.passwordConfirmaion })}>
                    </input>
                    { errors.passwordConfirmaion && <div className="invalid-feedback">{errors.passwordConfirmaion}</div> }
                </div>
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
                    <button disabled={this.state.isLoading}  className="btn btn-primary btn-lg">Sign Up</button>
                </div>
            </form>
        )
    }
}

SignupFrom.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default SignupFrom;