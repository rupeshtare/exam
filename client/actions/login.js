import axios from "axios";

export function login(data) {
    return disaptch => {
        return axios.post("/api/auth", data);
    }
}