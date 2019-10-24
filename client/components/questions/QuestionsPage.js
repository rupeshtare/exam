import React from "react";
import { connect } from "react-redux";

import QuestionsForm from "./QuestionsForm";
import { questionSaveRequest } from "../../actions/questionActions";
import { addFlashMessage } from "../../actions/flashMessages";

class QuestionsPage extends React.Component {
    render() {
        const { questionSaveRequest, addFlashMessage } = this.props;
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <QuestionsForm questionSaveRequest={questionSaveRequest} addFlashMessage={addFlashMessage}></QuestionsForm>
                </div>
            </div>
        );
    }
}


export default connect(null, { questionSaveRequest, addFlashMessage })(QuestionsPage);