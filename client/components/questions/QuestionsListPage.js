import React from "react";
import { connect } from "react-redux";

import QuestionsListForm from "./QuestionsListForm";
import { getQuestions, deleteQuestion } from "../../actions/questionActions";
import { addToCart, removeFromCart } from "../../actions/cart";

class QuestionsListPage extends React.Component {
    render() {
        const { selectedItems, addToCart, removeFromCart, getQuestions, deleteQuestion } = this.props;
        return (
            <div className="col-md-10 offset-md-1">
                <QuestionsListForm
                    selectedItems={selectedItems}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
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

export default connect(mapStateToProps, { addToCart, removeFromCart, getQuestions, deleteQuestion })(QuestionsListPage);