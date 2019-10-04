import React from "react";
import { Link } from "react-router-dom";

class NavigationBar extends React.Component {
    render() {
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
                    <ul className="navbar-nav">
                        <li>
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavigationBar;