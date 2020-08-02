import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

import SelectFieldGroup from "../common/SelectFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import validateInput from "../../../server/shared/validations/question";

class QuestionsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correct_answer: [],
            difficulty_level: "",
            errors: {},
            isLoading: false,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "correct_answer") {
            this.state.correct_answer.indexOf(value) === -1
                ? this.state.correct_answer.push(value)
                : this.state.correct_answer.length === 0
                    ? this.state.correct_answer = []
                    : this.state.correct_answer.splice(this.state.correct_answer.indexOf(value), 1)
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.questionSaveRequest(this.state).then(
                ({ response }) => {
                    this.props.addFlashMessage({
                        type: "success",
                        text: "Your question saved successfully."
                    })
                    this.props.history.push("/");
                },
                ({ response }) => this.setState({ errors: response.data, isLoading: false })
            );
        }
    }

    render() {
        const { question, option1, option2, option3, option4, correct_answer, difficulty_level, errors, isLoading } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h5>New Question</h5>
                <TextareaFieldGroup
                    field="question"
                    label="Question"
                    value={question}
                    error={errors.question}
                    onChange={this.onChange}
                />
                <TextareaFieldGroup
                    field="option1"
                    label="Option 1"
                    value={option1}
                    error={errors.option1}
                    onChange={this.onChange}
                />
                <TextareaFieldGroup
                    field="option2"
                    label="Option 2"
                    value={option2}
                    error={errors.option2}
                    onChange={this.onChange}
                />
                <TextareaFieldGroup
                    field="option3"
                    label="Option 3"
                    value={option3}
                    error={errors.option3}
                    onChange={this.onChange}
                />
                <TextareaFieldGroup
                    field="option4"
                    label="Option 4"
                    value={option4}
                    error={errors.option4}
                    onChange={this.onChange}
                />
                <SelectFieldGroup
                    field="correct_answer"
                    label="Correct Answer"
                    value={correct_answer}
                    options={[[1, 1], [2, 2], [3, 3], [4, 4]]}
                    error={errors.correct_answer}
                    onChange={this.onChange}
                    multiple={true}
                />
                <SelectFieldGroup
                    field="difficulty_level"
                    label="Difficluty Level"
                    value={difficulty_level}
                    options={[["E", "Easy"], ["M", "Medium"], ["D", "Difficult"]]}
                    error={errors.difficulty_level}
                    onChange={this.onChange}
                    multiple={false}
                />
                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-outline-primary">Save</button>
                </div>
            </form>
        )
    }
}

QuestionsForm.propTypes = {
    questionSaveRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

export default withRouter(QuestionsForm);