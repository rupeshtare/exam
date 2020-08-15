import axios from "axios";

export function getQuestionPapers(params) {
    return dispatch => {
        return axios.get("/api/questionPapers", { params });
    }
}

export function getQuestionPaper(paper, params) {
    return dispatch => {
        return axios.get(`/api/questionPapers/${paper}`, { params });
    }
}

export function saveQuestionPaper(params) {
    return dispatch => {
        return axios.post("/api/questionPapers", params);
    }
}

export function updateQuestionPaper(params) {
    return dispatch => {
        return axios.put("/api/questionPapers", params);
    }
}