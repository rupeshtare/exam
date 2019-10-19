import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/authActions";

class NavigationBar extends React.Component {

    logout(e) {
        e.preventDefault();
        this.props.logout();
    } 

    render() {
        const { isAuthenticated } = this.props.auth;

        const guestLinks = (
            <ul className="navbar-nav">
                <li><Link to="/signup" className="nav-link">Sign Up</Link></li>
                <li><Link to="/login" className="nav-link">Login</Link></li>
            </ul>
        )

        const userLinks = (
            <ul className="navbar-nav">
                <li><a href="#" className="nav-link" onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Exam</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                    </ul>
                    { isAuthenticated ? userLinks : guestLinks }
                </div>
            </nav>
        )
    }
}

NavigationBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(NavigationBar);