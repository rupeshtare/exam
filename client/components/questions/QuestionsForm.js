import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import TextareaFieldGroup from "../common/TextareaFieldGroup";
import validateInput from "../../../server/shared/validations/question";
import CheckboxOrRadioButtonFieldGroup from "../common/CheckboxOrRadioButtonFieldGroup";


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
            id: this.props.match.params.id || null,
        }

        this.onChange = this.onChange.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== null) {
            this.getQuestion();
        }
    }

    getQuestion() {
        this.props.getQuestion(this.state.id).then(
            res => { this.setState(res.data) },
            err => { this.props.addFlashMessage({ type: "error", text: "No record found." }) }
        );
    }

    onChange(e) {
        const {name, value} = e.target;

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

    save(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });

            this.props.saveQuestion(this.state).then(
                ({ res }) => {
                    this.props.addFlashMessage({ type: "success", text: "Your question saved successfully." })
                    this.props.history.push("/");
                },
                ({ err }) => this.setState({ errors: err.data, isLoading: false })
            );
        }
    }

    update(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });

            this.props.updateQuestion(this.state).then(
                ({ res }) => {
                    this.props.clearCart();
                    this.props.addFlashMessage({ type: "success", text: "Your question updated successfully." })
                    this.props.history.push("/questions/list");
                },
                ({ err }) => this.setState({ errors: err.data, isLoading: false })
            );
        }
    }

    render() {
        const { question, option1, option2, option3, option4, correct_answer, difficulty_level, errors, isLoading } = this.state;
        return (
            <form onSubmit={this.state.id ? this.update : this.save}>
                <h5>{this.state.id ? "Update Question" : "New Question"}</h5>
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
                <CheckboxOrRadioButtonFieldGroup
                    key={'a' + correct_answer.length}
                    disabled={false}
                    examQuestion={{
                        id: "correct_answer",
                        question: "Correct Answer",
                        option1: "Option 1",
                        option2: "Option 2",
                        option3: "Option 3",
                        option4: "Option 4",
                        type: "M"
                    }}
                    error={errors.correct_answer}
                    answer={correct_answer}
                    onChange={this.onChange}>
                </CheckboxOrRadioButtonFieldGroup>
                <CheckboxOrRadioButtonFieldGroup
                    key={'d' + correct_answer.length}
                    disabled={false}
                    options={["E", "M", "D"]}
                    examQuestion={{
                        id: "difficulty_level",
                        question: "Difficluty Level",
                        option1: "Easy",
                        option2: "Medium",
                        option3: "Difficult",
                        type: "S"
                    }}
                    error={errors.difficulty_level}
                    answer={[difficulty_level]}
                    onChange={this.onChange}>
                </CheckboxOrRadioButtonFieldGroup>
                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary">{this.state.id ? "Update" : "Save"}</button>
                </div>
            </form>
        )
    }
}

QuestionsForm.propTypes = {
    saveQuestion: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getQuestion: PropTypes.func.isRequired,
    updateQuestion: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
}

export default withRouter(QuestionsForm);