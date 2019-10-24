import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withRouter }  from "react-router-dom";

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
        if(name === "correct_answer") {
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

        if(!isValid) {
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
        const { errors } = this.state;
        return(
            <form onSubmit={this.onSubmit}>
                <h1>New Question</h1>
                <div className="form-group">
                    <label className="control-label">Question</label>
                    <textarea
                        value={this.state.question}
                        onChange={this.onChange}
                        name="question"
                        className={classnames("form-control", { "is-invalid": errors.question })}>
                    </textarea>
                    { errors.question && <div className="invalid-feedback">{errors.question}</div> }
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label className="control-label">Option 1</label>
                        <textarea
                            value={this.state.option1}
                            onChange={this.onChange}
                            name="option1"
                            className={classnames("form-control", { "is-invalid": errors.option1 })}>
                        </textarea>
                        { errors.option1 && <div className="invalid-feedback">{errors.option1}</div> }
                    </div>
                    <div className="col-md-6">
                        <label className="control-label">Option 2</label>
                        <textarea
                            value={this.state.option2}
                            onChange={this.onChange}
                            name="option2"
                            className={classnames("form-control", { "is-invalid": errors.option2 })}>
                        </textarea>
                        { errors.option2 && <div className="invalid-feedback">{errors.option2}</div> }
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label className="control-label">Option 3</label>
                        <textarea
                            value={this.state.option3}
                            onChange={this.onChange}
                            name="option3"
                            className={classnames("form-control", { "is-invalid": errors.option3 })}>
                        </textarea>
                        { errors.option3 && <div className="invalid-feedback">{errors.option3}</div> }
                    </div>
                    <div className="col-md-6">
                        <label className="control-label">Option 4</label>
                        <textarea
                            value={this.state.option4}
                            onChange={this.onChange}
                            name="option4"
                            className={classnames("form-control", { "is-invalid": errors.option4 })}>
                        </textarea>
                        { errors.option4 && <div className="invalid-feedback">{errors.option4}</div> }
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label className="control-label">Correct Answer</label>
                        <select
                            value={this.state.correct_answer}
                            onChange={this.onChange}
                            name="correct_answer"
                            multiple={true}
                            className={classnames("form-control", { "is-invalid": errors.correct_answer })}>
                            <option value="" disabled>Choose correct answer</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        { errors.correct_answer && <div className="invalid-feedback">{errors.correct_answer}</div> }
                    </div>                    
                    <div className="col-md-6">
                    <label className="control-label">Difficluty Level</label>
                        <select
                            value={this.state.difficulty_level}
                            onChange={this.onChange}
                            name="difficulty_level"
                            className={classnames("form-control", { "is-invalid": errors.difficulty_level })}>
                            <option value="" disabled>Choose difficluty level</option>
                            <option value="E">Easy</option>
                            <option value="M">Medium</option>
                            <option value="D">Difficult</option>
                        </select>
                        { errors.difficulty_level && <div className="invalid-feedback">{errors.difficulty_level}</div> }
                    </div>
                </div>
                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid}  className="btn btn-primary btn-lg">Save</button>
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