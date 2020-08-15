import React from "react";
import { connect } from "react-redux";

import QuestionPapersListForm from "./QuestionPapersListForm";
import { getQuestionPapers } from "../../actions/questionPaperAction";
import { addFlashMessage } from "../../actions/flashMessages";

class QuestionPapersListPage extends React.Component {
    render() {
        const { getQuestionPapers, addFlashMessage } = this.props;
        return (
            <QuestionPapersListForm
                getQuestionPapers={getQuestionPapers}
                addFlashMessage={addFlashMessage}
            ></QuestionPapersListForm>
        );
    }
}

export default connect(null, { getQuestionPapers, addFlashMessage })(QuestionPapersListPage);