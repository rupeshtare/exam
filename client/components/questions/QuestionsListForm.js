import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import CustomLink from "../../utils/customLink";

import Table from "../common/Table";

class QuestionsListForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            pagination: {},
            isLoading: false,
            tableColumns: ["question", "difficulty_level"] // "option1", "option2", "option3", "option4", "correct_answer"
        }

        this.previousData = this.previousData.bind(this);
        this.nextData = this.nextData.bind(this);
        this.selectedRow = this.selectedRow.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }

    componentDidMount() {
        this.getQuestions();
    }

    getQuestions() {
        this.props.getQuestions().then(res => {
            const { questions, pagination } = res.data;
            this.setState({ questions, pagination });
        });
    }

    editQuestion(e) {
        e.preventDefault();
        this.props.history.push(`/questions/edit/${this.props.selectedItems[0]}`);
    }

    deleteQuestion(e) {
        e.preventDefault();
        this.props.deleteQuestion({ questions: this.props.selectedItems }).then(
            res => {
                this.props.addFlashMessage({ type: "success", text: "Question(s) deleted sucessfully." });
                this.props.clearCart();
                this.getQuestions();
            },
            err => { this.props.addFlashMessage({ type: "error", text: "Error while deleting question(s)." }) }
        )
    }

    previousData(e) {
        e.preventDefault();
        const { page, pageSize } = this.state.pagination;
        this.props.getQuestions({ page: page - 1, pageSize: pageSize }).then(res => {
            const { questions, pagination } = res.data;
            this.setState({ questions, pagination });
        });
    }

    nextData(e) {
        e.preventDefault();
        const { page, pageSize } = this.state.pagination;
        this.props.getQuestions({ page: page + 1, pageSize: pageSize }).then(res => {
            const { questions, pagination } = res.data;
            this.setState({ questions, pagination });
        });
    }

    selectedRow(e) {
        const { value, checked } = e.target;
        if (checked === true) {
            this.props.addToCart(value);
        } else if (checked === false) {
            this.props.removeFromCart(value);
        }
    }

    render() {
        const { selectedItems } = this.props;
        return (
            <form>
                <h5>Questions</h5>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className="page-item"><CustomLink condition="T" to="/questions/new" className="nav-link">Create</CustomLink></li>
                        <li className="page-item"><CustomLink condition="T" to="#" onClick={this.editQuestion} className={classnames("nav-link", { "disabled": selectedItems.length !== 1 })}>Edit</CustomLink></li>
                        <li className="page-item"><CustomLink condition="T" to="#" onClick={this.deleteQuestion} className={classnames("nav-link", { "disabled": selectedItems.length === 0 })}>Delete</CustomLink></li>
                    </ul>
                </nav>
                <Table
                    tableClass="table table-sm"
                    tableHeaderClass="table-primary"
                    tableData={this.state.questions}
                    tableColumns={this.state.tableColumns}
                    pagination={this.state.pagination}
                    previousData={this.previousData}
                    nextData={this.nextData}
                    selectable={true}
                    selecteCallback={this.selectedRow}
                    selectedItems={selectedItems}
                ></Table>
            </form>
        )
    }
}

QuestionsListForm.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
}

export default withRouter(QuestionsListForm);