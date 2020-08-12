import { combineReducers } from "redux";

import flashMessages from "./reducers/flashMessages";
import auth from "./reducers/auth";
import cart from "./reducers/cart";

export default combineReducers({
    flashMessages,
    auth,
    cart
})