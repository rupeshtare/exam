import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { isEmpty } from "lodash";
import { withRouter } from "react-router-dom";

import CheckboxOrRadioButtonFieldGroup from "../common/CheckboxOrRadioButtonFieldGroup";

class QuestionPaperForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            isLoading: false,
            invalid: false,
            answers: {},
            paper: this.props.match.params.id,
            results: {}
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getAnswerSheet();
        this.getQuestionPaper();
    }

    getAnswerSheet() {
        this.props.getAnswerSheet(this.state.paper).then(res => {
            let { answers, results } = res.data;
            this.setState({ answers, results });
        });
    }

    getQuestionPaper() {
        this.props.getQuestionPaper(this.state.paper).then(res => {
            let { questions } = res.data;
            this.setState({ questions });
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
            const { answers, paper } = this.state;

            this.props.examSubmitRequest({ answers, paper }).then(
                ({ response }) => {
                    this.props.addFlashMessage({
                        type: "success",
                        text: "Your answers saved successfully."
                    })
                    this.props.history.push("/exam");
                },
                ({ response }) => this.setState({ errors: response.data, isLoading: false })
            );
        }
    }

    render() {
        const { questions, results, answers, isLoading, invalid } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h5>Questions</h5>
                {
                    questions.map((question, index) =>
                        <CheckboxOrRadioButtonFieldGroup
                            key={index}
                            questionNo={index + 1}
                            examQuestion={question}
                            result={results[question.id]}
                            answer={answers[question.id]}
                            onChange={this.onChange}>
                        </CheckboxOrRadioButtonFieldGroup>
                    )
                }
                <div className={classnames("form-group", { "invisible": !isEmpty(this.state.answers) })}>
                    <button disabled={isLoading || invalid} className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}

QuestionPaperForm.propTypes = {
    examSubmitRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getQuestionPaper: PropTypes.func.isRequired,
    getAnswerSheet: PropTypes.func.isRequired
}

export default withRouter(QuestionPaperForm);