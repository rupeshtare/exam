import React from "react";
import { connect } from "react-redux";

import ExamForm from "./ExamForm";
import { examSubmitRequest } from "../../actions/examActions";
import { addFlashMessage } from "../../actions/flashMessages";
import { getQuestions } from "../../actions/questionActions";

class ExamPage extends React.Component {
    render() {
        const { examSubmitRequest, addFlashMessage, getQuestions } = this.props;
        return (
            <ExamForm examSubmitRequest={examSubmitRequest} addFlashMessage={addFlashMessage} getQuestions={getQuestions} ></ExamForm>
        );
    }
}


export default connect(null, { examSubmitRequest, addFlashMessage, getQuestions })(ExamPage);