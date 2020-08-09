import React from "react";
import { connect } from "react-redux";

import ExamForm from "./ExamForm";
import { getExamRsults, getQuestionPapers } from "../../actions/examActions";
import { addFlashMessage } from "../../actions/flashMessages";

class ExamPage extends React.Component {
    render() {
        const { getExamRsults, getQuestionPapers, addFlashMessage } = this.props;
        return (
            <ExamForm getExamRsults={getExamRsults} getQuestionPapers={getQuestionPapers} addFlashMessage={addFlashMessage}></ExamForm>
        );
    }
}


export default connect(null, { getExamRsults, getQuestionPapers, addFlashMessage })(ExamPage);