import axios from "axios";
import React from 'react';

export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post("/api/users", userData);
    }
}

export function isUserExists(identifier) {
    return dispatch => {
        return axios.get("/api/users/"+identifier);
    }
}