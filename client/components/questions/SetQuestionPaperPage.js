import React from "react";
import { connect } from "react-redux";

import SetQuestionPaperForm from "./SetQuestionPaperForm";
import { setQuestionPaper } from "../../actions/questionActions";
import { clearCart } from "../../actions/cart";
import { addFlashMessage } from "../../actions/flashMessages";

class SetQuestionPaperPage extends React.Component {
    render() {
        const { setQuestionPaper, clearCart, addFlashMessage, selectedItems } = this.props;
        return (
            <div className="col-md-8 offset-md-2">
                <SetQuestionPaperForm setQuestionPaper={setQuestionPaper} clearCart={clearCart} addFlashMessage={addFlashMessage} selectedItems={selectedItems}></SetQuestionPaperForm>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedItems: state.cart
    }
}

export default connect(mapStateToProps, { setQuestionPaper, clearCart, addFlashMessage })(SetQuestionPaperPage);