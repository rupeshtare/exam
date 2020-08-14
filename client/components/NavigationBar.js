import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/authActions";
import CustomLink from "../utils/customLink";

import Cart from "./cart/cart";

class NavigationBar extends React.Component {

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const guestLinks = (
            <ul className="navbar-nav">
                <li><CustomLink to="/signup" className="nav-link" aria-expanded="false">Sign Up</CustomLink></li>
                <li><CustomLink to="/login" className="nav-link" aria-expanded="false">Login</CustomLink></li>
            </ul>
        )

        const userLinks = (
            <ul className="navbar-nav">
                <li>
                    <CustomLink condition="T" to="/questionPaper" className="nav-link"><Cart /></CustomLink>
                </li>
                <li className="nav-item dropdown">
                    <CustomLink condition="T" to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Questions
                    </CustomLink>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <CustomLink condition="T" to="/questions" className="dropdown-item">Create</CustomLink>
                        <CustomLink condition="T" to="/questions/list" className="dropdown-item">List</CustomLink>
                    </div>
                </li>
                <li>
                    <CustomLink to="#" className="nav-link" onClick={this.logout.bind(this)}>Logout</CustomLink>
                </li>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <CustomLink to="/" className="navbar-brand">Online Exam</CustomLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <CustomLink condition="S" to="/exam" className="nav-link">Exam</CustomLink>
                        </li>
                    </ul>
                    {isAuthenticated ? userLinks : guestLinks}
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