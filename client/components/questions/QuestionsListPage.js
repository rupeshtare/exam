import React from "react";
import { connect } from "react-redux";

import QuestionsListForm from "./QuestionsListForm";
import { getQuestions } from "../../actions/questionActions";

class QuestionsListPage extends React.Component {
    render() {
        const { getQuestions } = this.props;
        return (
            <QuestionsListForm getQuestions={getQuestions} ></QuestionsListForm>
        );
    }
}


export default connect(null, { getQuestions })(QuestionsListPage);