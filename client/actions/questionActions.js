import axios from "axios";

export function getQuestions(params) {
    return dispatch => {
        return axios.get("/api/questions", { params });
    }
}

export function getQuestion(question, params) {
    return dispatch => {
        return axios.get(`/api/questions/${question}`, params);
    }
}

export function saveQuestion(questionData) {
    return dispatch => {
        return axios.post("/api/questions", questionData);
    }
}

export function updateQuestion(params) {
    return dispatch => {
        return axios.put(`/api/questions`, params);
    }
}

export function deleteQuestion(params) {
    return dispatch => {
        return axios.delete("/api/questions", { data: params });
    }
}
