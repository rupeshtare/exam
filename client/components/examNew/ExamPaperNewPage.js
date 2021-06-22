import React from "react";
import { connect } from "react-redux";

import ExamPaperNewForm from "./ExamPaperNewForm";
import { examSubmitRequest } from "../../actions/examActions";
import { addFlashMessage } from "../../actions/flashMessages";
import { getQuestionPaper } from "../../actions/examActions";

class ExamPaperNewPage extends React.Component {
  render() {
    const { examSubmitRequest, addFlashMessage, getQuestionPaper } = this.props;
    return (
      <ExamPaperNewForm
        examSubmitRequest={examSubmitRequest}
        addFlashMessage={addFlashMessage}
        getQuestionPaper={getQuestionPaper}
      ></ExamPaperNewForm>
    );
  }
}

export default connect(null, {
  examSubmitRequest,
  addFlashMessage,
  getQuestionPaper,
})(ExamPaperNewPage);
