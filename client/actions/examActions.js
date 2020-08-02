import axios from "axios";

export function examSubmitRequest(questionData) {
    return dispatch => {
        return axios.post("/api/exams", questionData);
    }
}
