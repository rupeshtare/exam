import findIndex from "lodash/findIndex";

import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../actions/types";

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [
                ...state,
                action.id
            ];
        case REMOVE_FROM_CART:
            const index = state.indexOf(action.id);
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ]
            }
            return state;
        case CLEAR_CART:
            return [];
        default: return state;
    }
}