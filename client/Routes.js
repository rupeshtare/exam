import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./components/App";
import Greetings from "./components/Greetings";
import SignupPage from "./components/signup/SignupPage";
import LoginPage from "./components/login/LoginPage";
import QuestionsPage from "./components/questions/QuestionsPage";
import QuestionsListPage from "./components/questions/QuestionsListPage";
import ExamPage from "./components/exam/ExamPage";
import ExamPaperPage from "./components/exam/ExamPaperPage";
import QuestionPapersListPage from "./components/questionPapers/QuestionPapersListPage";
import QuestionPaperPage from "./components/questionPapers/QuestionPaperPage";

import requireAuth from "./utils/requireAuth";

class Routes extends React.Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Route path="/" component={App}></Route>
                    <Route exact path="/" component={Greetings}></Route>
                    <Route path="/signup" component={SignupPage}></Route>
                    <Route path="/login" component={LoginPage}></Route>
                    <Route exact path="/questions" component={requireAuth(QuestionsListPage, "T")}></Route>
                    <Route exact path="/questions/new" component={requireAuth(QuestionsPage, "T")}></Route>
                    <Route exact path="/questions/edit/:id" component={requireAuth(QuestionsPage, "T")}></Route>
                    <Route exact path="/exam" component={requireAuth(ExamPage, "S")}></Route>
                    <Route exact path="/exam/:id" component={requireAuth(ExamPaperPage, "S")}></Route>
                    <Route exact path="/questionPapers" component={requireAuth(QuestionPapersListPage, "T")}></Route>
                    <Route exact path="/questionPapers/new" component={requireAuth(QuestionPaperPage, "T")}></Route>
                    <Route exact path="/questionPapers/edit/:id" component={requireAuth(QuestionPaperPage, "T")}></Route>
                </BrowserRouter>
            </div>
        );
    }
}

export default Routes;
