import axios from "axios";

export function questionSaveRequest(questionData) {
    return dispatch => {
        return axios.post("/api/questions", questionData);
    }
}