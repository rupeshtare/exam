import React from "react";
import { connect } from "react-redux";

import QuestionsListForm from "./QuestionsListForm";
import { getQuestions } from "../../actions/questionActions";
import { addToCart, removeFromCart } from "../../actions/cart";

class QuestionsListPage extends React.Component {
    render() {
        const { getQuestions, addToCart, removeFromCart, selectedItems } = this.props;
        return (
            <div className="col-md-10 offset-md-1">
            <QuestionsListForm getQuestions={getQuestions} addToCart={addToCart} removeFromCart={removeFromCart} selectedItems={selectedItems}></QuestionsListForm>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedItems: state.cart
    }
}

export default connect(mapStateToProps, { getQuestions, addToCart, removeFromCart })(QuestionsListPage);