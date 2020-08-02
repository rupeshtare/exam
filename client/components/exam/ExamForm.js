import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import CheckboxOrRadioButtonFieldGroup from "../common/CheckboxOrRadioButtonFieldGroup";

class ExamForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            isLoading: false,
            invalid: false,
            answers: {}
        }

        this.getQuestions();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    getQuestions() {
        this.props.getQuestions().then(res => {
            this.setState({ questions: res.data.questions });
        });
    }

    onChange(e) {
        let { name, value, type, checked } = e.target;
        let field = this.state.answers[name];
        if (checked) {
            if (type === "checkbox") {
                field === undefined ? this.state.answers[name] = [value] : field.push(value)
            } else {
                this.state.answers[name] = [value]
            }
        } else {
            if (type === "checkbox") {
                this.state.answers[name].splice(this.state.answers[name].indexOf(value), 1)
            } else {
                this.state.answers[name] = []
            }
        }
        console.log(this.state);
    }

    isValid() {
        // const { errors, isValid } = validateInput(this.state);
        // if (!isValid) {
        //     this.setState({ errors });
        // }
        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.examSubmitRequest(this.state).then(
                ({ response }) => {
                    this.props.addFlashMessage({
                        type: "success",
                        text: "Your answers saved successfully."
                    })
                    this.props.history.push("/");
                },
                ({ response }) => this.setState({ errors: response.data, isLoading: false })
            );
        }
    }

    render() {
        const { questions, isLoading, invalid } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h5>Questions</h5>
                {
                    questions.map((question, index) =>
                        <CheckboxOrRadioButtonFieldGroup
                            key={index}
                            questionNo={index + 1}
                            examQuestion={question}
                            onChange={this.onChange}>
                        </CheckboxOrRadioButtonFieldGroup>
                    )
                }
                <div className="form-group">
                    <button disabled={isLoading || invalid} className="btn btn-outline-primary">Submit</button>
                </div>
            </form>
        )
    }
}

ExamForm.propTypes = {
    examSubmitRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getQuestions: PropTypes.func.isRequired,
}

export default withRouter(ExamForm);