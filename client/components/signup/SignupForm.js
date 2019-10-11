import React from "react";
import timezones from "../../data/timezones";
import map from "lodash/map";
import PropTypes from 'prop-types';

class SignupFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmaion: "",
            timezone: "",
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.userSignupRequest(this.state);
    }

    render() {
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
                        className="form-control">
                    </input>
                </div>
                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control">
                    </input>
                </div>
                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className="form-control">
                    </input>
                </div>
                <div className="form-group">
                    <label className="control-label">Password Confirmation</label>
                    <input
                        value={this.state.passwordConfirmaion}
                        onChange={this.onChange}
                        type="password"
                        name="passwordConfirmaion"
                        className="form-control">
                    </input>
                </div>
                <div className="form-group">
                    <label className="control-label">Timezone</label>
                    <select
                        value={this.state.timezone}
                        onChange={this.onChange}
                        name="timezone"
                        className="form-control">
                        <option value="" disabled>Choose your timezone</option>
                        {options}
                    </select>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg">Sign Up</button>
                </div>
            </form>
        )
    }
}

SignupFrom.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default SignupFrom;