import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import validateInput from "../../../server/shared/validations/questionPaper";

class SetQuestionPaperForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            subject: "",
            errors: {},
            isLoading: false,
            questions: this.props.selectedItems,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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
            const { questions, name, subject } = this.state
            this.props.setQuestionPaper({ questions, name, subject }).then(
                ({ response }) => {
                    this.props.addFlashMessage({
                        type: "success",
                        text: "Your question saved successfully."
                    })
                    this.props.clearCart()
                    this.props.history.push("/");
                },
                ({ response }) => this.setState({ errors: response.data, isLoading: false })
            );
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { name, subject, errors, isLoading } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Question Paper</h1>

                {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                <TextFieldGroup
                    field="name"
                    label="Name"
                    value={name}
                    error={errors.name}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="subject"
                    label="Subject"
                    value={subject}
                    error={errors.subject}
                    onChange={this.onChange}
                />
                <div className="form-group"><button className="btn btn-primary" disabled={isLoading}>Save</button></div>
            </form>
        )
    }
}

SetQuestionPaperForm.propTypes = {
    setQuestionPaper: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired
}

export default withRouter(SetQuestionPaperForm);