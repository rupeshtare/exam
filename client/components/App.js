import React from "react";
import NavigationBar from "./NavigationBar";
import FlashMessagesList from "./flash/flashMessagesList";

class App extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <FlashMessagesList/>
            </div>
        );
    }
}

export default App;