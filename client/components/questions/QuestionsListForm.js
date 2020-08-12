import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import Table from "../common/Table";

class QuestionsListForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            pagination: {},
            isLoading: false,
            tableColumns: ["question",  "difficulty_level"] // "option1", "option2", "option3", "option4", "correct_answer"
        }

        this.previousData = this.previousData.bind(this);
        this.nextData = this.nextData.bind(this);
        this.selectedRow = this.selectedRow.bind(this);
        this.getQuestions();
    }

    getQuestions() {
        this.props.getQuestions().then(res => {
            const { questions, pagination } = res.data;
            this.setState({ questions, pagination });
        });
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
        const id = e.target.value;
        const checked = e.target.checked;
        if (checked === true) {
            this.props.addToCart(id);
        } else if (checked === false) {
            this.props.removeFromCart(id);
        }
    }

    render() {
        return (
            <form>
                <h5>Questions</h5>
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
                    selectedItems={this.props.selectedItems}
                ></Table>
            </form>
        )
    }
}

QuestionsListForm.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired,
}

export default withRouter(QuestionsListForm);