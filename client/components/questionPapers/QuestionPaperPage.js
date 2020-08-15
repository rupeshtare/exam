import React from "react";
import { connect } from "react-redux";

import QuestionPaperForm from "./QuestionPaperForm";
import { getQuestions } from "../../actions/questionActions";
import { getQuestionPaper, saveQuestionPaper, updateQuestionPaper } from "../../actions/questionPaperAction";
import { addToCart, removeFromCart, clearCart } from "../../actions/cart";
import { addFlashMessage } from "../../actions/flashMessages";

class QuestionPaperPage extends React.Component {
    render() {
        const { getQuestions, getQuestionPaper, saveQuestionPaper, updateQuestionPaper, addToCart, removeFromCart, clearCart, addFlashMessage, selectedItems } = this.props;
        return (
            <div className="col-md-8 offset-md-2">
                <QuestionPaperForm
                    getQuestions={getQuestions}
                    getQuestionPaper={getQuestionPaper}
                    saveQuestionPaper={saveQuestionPaper}
                    updateQuestionPaper={updateQuestionPaper}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                    addFlashMessage={addFlashMessage}
                    selectedItems={selectedItems}
                ></QuestionPaperForm>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedItems: state.cart
    }
}

export default connect(mapStateToProps, { getQuestions, getQuestionPaper, saveQuestionPaper, updateQuestionPaper, addToCart, removeFromCart, clearCart, addFlashMessage })(QuestionPaperPage);