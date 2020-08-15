import React from "react";
import { connect } from "react-redux";

import ExamPaperForm from "./ExamPaperForm";
import { examSubmitRequest } from "../../actions/examActions";
import { addFlashMessage } from "../../actions/flashMessages";
import { getQuestionPaper, getAnswerSheet } from "../../actions/examActions";

class ExamPaperPage extends React.Component {
    render() {
        const { examSubmitRequest, addFlashMessage, getQuestionPaper, getAnswerSheet } = this.props;
        return (
            <ExamPaperForm
                examSubmitRequest={examSubmitRequest}
                addFlashMessage={addFlashMessage}
                getQuestionPaper={getQuestionPaper}
                getAnswerSheet={getAnswerSheet}
            ></ExamPaperForm>
        );
    }
}


export default connect(null, { examSubmitRequest, addFlashMessage, getQuestionPaper, getAnswerSheet })(ExamPaperPage);