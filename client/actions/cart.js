import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./types";

export function addToCart(id) {
    return {
        type: ADD_TO_CART,
        id
    }
}

export function removeFromCart(id) {
    return {
        type: REMOVE_FROM_CART,
        id
    }
}

export function clearCart() {
    return {
        type: CLEAR_CART
    }
}