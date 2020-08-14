import React from "react";
import { connect } from "react-redux";

import QuestionsForm from "./QuestionsForm";
import { getQuestion, saveQuestion, updateQuestion } from "../../actions/questionActions";
import { addFlashMessage } from "../../actions/flashMessages";
import { clearCart } from "../../actions/cart";


class QuestionsPage extends React.Component {
    render() {
        const { getQuestion, saveQuestion, updateQuestion, addFlashMessage, clearCart } = this.props;
        return (
            <div className="col-md-8 offset-md-2">
                <QuestionsForm
                    getQuestion={getQuestion}
                    saveQuestion={saveQuestion}
                    updateQuestion={updateQuestion}
                    addFlashMessage={addFlashMessage}
                    clearCart={clearCart}
                ></QuestionsForm>
            </div>
        );
    }
}


export default connect(null, { getQuestion, saveQuestion, updateQuestion, addFlashMessage, clearCart })(QuestionsPage);