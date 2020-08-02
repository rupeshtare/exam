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
            tableColumns: ["question", "option1", "option2", "option3", "option4", "correct_answer", "difficulty_level"]
        }

        this.previousData = this.previousData.bind(this);
        this.nextData = this.nextData.bind(this);
        this.getQuestions();
    }

    getQuestions() {
        this.props.getQuestions().then(res => {
            const { questions, pagination } = res.data;
            this.setState({ questions, pagination });
        });
    }


    previousData() {
        const { page, pageSize } = this.state.pagination;
        this.props.getQuestions({ page: page - 1, pageSize: pageSize }).then(res => {
            const { questions, pagination } = res.data;
            this.setState({ questions, pagination });
        });
    }

    nextData() {
        const { page, pageSize } = this.state.pagination;
        this.props.getQuestions({ page: page + 1, pageSize: pageSize }).then(res => {
            const { questions, pagination } = res.data;
            this.setState({ questions, pagination });
        });
    }

    render() {
        return (
            <div>
                <h5>Questions</h5>
                <Table
                    tableClass="table table-sm"
                    tableHeaderClass="thead-dark"
                    tableData={this.state.questions}
                    tableColumns={this.state.tableColumns}
                    pagination={this.state.pagination}
                    previousData={this.previousData}
                    nextData={this.nextData}
                ></Table>
            </div>
        )
    }
}

QuestionsListForm.propTypes = {
    getQuestions: PropTypes.func.isRequired,
}

export default withRouter(QuestionsListForm);