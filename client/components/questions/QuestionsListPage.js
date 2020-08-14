import React from "react";
import { connect } from "react-redux";

import QuestionsListForm from "./QuestionsListForm";
import { getQuestions, deleteQuestion } from "../../actions/questionActions";
import { addToCart, removeFromCart, clearCart } from "../../actions/cart";
import { addFlashMessage } from "../../actions/flashMessages";


class QuestionsListPage extends React.Component {
    render() {
        const { addFlashMessage, selectedItems, addToCart, removeFromCart, clearCart, getQuestions, deleteQuestion } = this.props;
        return (
            <div className="col-md-10 offset-md-1">
                <QuestionsListForm
                    addFlashMessage={addFlashMessage}
                    selectedItems={selectedItems}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                    getQuestions={getQuestions}
                    deleteQuestion={deleteQuestion}
                ></QuestionsListForm>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedItems: state.cart
    }
}

export default connect(mapStateToProps, { addFlashMessage, addToCart, removeFromCart, clearCart, getQuestions, deleteQuestion })(QuestionsListPage);