import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class QuestionsListForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            errors: {},
            isLoading: false,
        }
    }

    componentWillMount() {
        this.getQuestions();
    }

    getQuestions() {
        this.props.getQuestions().then(res => {
            console.log(res.data.questions);
            this.setState({ questions: res.data.questions });
        });
    }

    render() {
        const questions = this.state.questions.map(question =>
            <li key={question.id}>{question.question}</li>
        );

        return (
            <div>
                <h1>Questions</h1>
                <ul>{questions}</ul>
            </div>
        )
    }
}

QuestionsListForm.propTypes = {
    getQuestions: PropTypes.func.isRequired,
}

export default withRouter(QuestionsListForm);