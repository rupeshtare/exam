import axios from "axios";
import jwt from "jsonwebtoken";

import setAuthorizationToken from "../utils/setAuthorizationToken";
import { SET_CURRENT_USER } from "./types";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout() {
    return disaptch => {
        localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        disaptch(setCurrentUser({}));
    }
}

export function login(data) {
    return disaptch => {
        return axios.post("/api/auth", data).then(res => {
            const token = res.data.token;
            localStorage.setItem("jwtToken", token);
            setAuthorizationToken(token);
            disaptch(setCurrentUser(jwt.decode(token)));
        })
    }
}