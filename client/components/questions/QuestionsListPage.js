import React from "react";
import { connect } from "react-redux";

import QuestionsListForm from "./QuestionsListForm";
import { getQuestions } from "../../actions/questionActions";

class QuestionsListPage extends React.Component {
    render() {
        const { getQuestions } = this.props;
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <QuestionsListForm getQuestions={getQuestions} ></QuestionsListForm>
                </div>
            </div>
        );
    }
}


export default connect(null, { getQuestions })(QuestionsListPage);