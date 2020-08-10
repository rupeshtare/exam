import axios from "axios";

export function examSubmitRequest(questionData) {
    return dispatch => {
        return axios.post("/api/exams", questionData);
    }
}

export function getExamRsults(params) {
    return dispatch => {
        return axios.get("/api/exams/results", { params });
    }
}

export function getQuestionPapers(params) {
    return dispatch => {
        return axios.get("/api/exams/questionPapers", { params });
    }
}

export function getQuestionPaper(paper, params) {
    return dispatch => {
        return axios.get(`/api/exams/questionPaper/${paper}`, { params });
    }
}

export function setQuestionPaper(params) {
    return dispatch => {
        return axios.post("/api/exams/questionPaper", { params });
    }
}

export function getAnswerSheet(paper, params) {
    return dispatch => {
        return axios.get(`/api/exams/answerSheet/${paper}`, { params });
    }
}