import React from "react";
import NavigationBar from "./NavigationBar";
import FlashMessagesList from "./flash/flashMessagesList";

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <NavigationBar/>
                <FlashMessagesList/>
            </div>
        );
    }
}

export default App;