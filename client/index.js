import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import Routes from './Routes';
import rootReducer from "./rootReducer";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

render(
    <Provider store={store}>
        <Routes />
    </Provider>, document.getElementById("app"));


if (module && module.hot) {
    module.hot.accept()
}