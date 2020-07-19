import axios from "axios";

export function questionSaveRequest(questionData) {
    return dispatch => {
        return axios.post("/api/questions", questionData);
    }
}

export function getQuestions() {
    return dispatch => {
        return axios.get("/api/questions");
    }
}
