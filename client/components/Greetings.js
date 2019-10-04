import React from "react";
import NavigationBar from "./NavigationBar";

class Greetings extends React.Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Online Exam</h1>
                    <p className="lead">Best oF Luck..!</p>
                </div>
            </div>
        );
    }
}

export default Greetings;