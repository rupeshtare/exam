import React from "react";
import NavigationBar from "./NavigationBar";

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <NavigationBar/>
            </div>
        );
    }
}

export default App;