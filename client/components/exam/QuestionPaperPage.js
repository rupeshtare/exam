import React from "react";
import { connect } from "react-redux";

import QuestionPaperForm from "./QuestionPaperForm";
import { examSubmitRequest } from "../../actions/examActions";
import { addFlashMessage } from "../../actions/flashMessages";
import { getQuestionPaper, getAnswerSheet } from "../../actions/examActions";

class QuestionPaperPage extends React.Component {
    render() {
        const { examSubmitRequest, addFlashMessage, getQuestionPaper, getAnswerSheet } = this.props;
        return (
            <QuestionPaperForm
                examSubmitRequest={examSubmitRequest}
                addFlashMessage={addFlashMessage}
                getQuestionPaper={getQuestionPaper}
                getAnswerSheet={getAnswerSheet}
            ></QuestionPaperForm>
        );
    }
}


export default connect(null, { examSubmitRequest, addFlashMessage, getQuestionPaper, getAnswerSheet })(QuestionPaperPage);