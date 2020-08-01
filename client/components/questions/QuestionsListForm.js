import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import Table from "../common/Table";

class QuestionsListForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            isLoading: false,
            tableColumns: ["question", "option1", "option2", "option3", "option4", "correct_answer", "difficulty_level"]
        }

        this.getQuestions();
    }

    getQuestions() {
        this.props.getQuestions().then(res => {
            this.setState({ questions: res.data.questions });
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
                ></Table>
            </div>
        )
    }
}

QuestionsListForm.propTypes = {
    getQuestions: PropTypes.func.isRequired,
}

export default withRouter(QuestionsListForm);