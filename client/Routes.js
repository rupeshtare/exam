import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import App from "./components/App";
import Greetings from "./components/Greetings";
import SignupPage from "./components/signup/SignupPage";

class Routes extends React.Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>         
                    <Route path="/" component={App}></Route>
                    <Route exact path="/" component={Greetings}></Route>
                    <Route path="/signup" component={SignupPage}></Route>
                </BrowserRouter>
            </div>
        );
    }
}

export default Routes;