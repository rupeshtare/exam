import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import Table from "../common/Table";
import TextFieldGroup from "../common/TextFieldGroup";
import validateInput from "../../../server/shared/validations/questionPaper";
import CheckboxOrRadioButtonFieldGroup from "../common/CheckboxOrRadioButtonFieldGroup";


class QuestionPaperForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            subject: "",
            locked: 1,
            tableColumns: ["question", "difficulty_level"],
            errors: {},
            isLoading: false,
            questions: [],
            id: this.props.match.params.id || null,
        }
        this.baseState = this.state;
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.selectedRow = this.selectedRow.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== null) {
            this.props.clearCart();
            this.getQuestionPapers();
        } else {
            this.getQuestions();
        }
    }

    getQuestionPapers() {
        this.props.getQuestionPaper(this.state.id).then(
            res => {
                const { name, subject, locked } = res.data;
                this.setState({ name, subject, locked })
                res.data.questions.forEach(element => {
                    this.props.addToCart(element);
                });
                this.getQuestions();
            },
            err => { this.props.addFlashMessage({ type: "success", text: "Error in loading question papers." }) }
        );
    }

    getQuestions() {
        let selectedItems = this.props.selectedItems;
        if (!isEmpty(selectedItems)) {
            this.props.getQuestions({ questions: selectedItems }).then(res => {
                const { questions } = res.data;
                this.setState({ questions });
            });
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
            const { name, subject, locked } = this.state;

            this.props.saveQuestionPaper({ questions: this.props.selectedItems, name, subject, locked }).then(
                ({ response }) => {
                    this.props.addFlashMessage({
                        type: "success",
                        text: "Question Paper created successfully."
                    });
                    this.props.clearCart();
                    this.props.history.push("/questionPapers");
                },
                ({ response }) => this.setState({ errors: response.data, isLoading: false })
            );

        }
    }

    update(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            const { id, name, subject, locked } = this.state;

            this.props.updateQuestionPaper({ questions: this.props.selectedItems, id, name, subject, locked }).then(
                ({ res }) => {
                    this.props.addFlashMessage({
                        type: "success",
                        text: "Question Paper updated successfully."
                    });
                    this.props.clearCart();
                    this.props.history.push("/questionPapers");
                },
                ({ err }) => this.setState({ errors: err.data, isLoading: false })
            );

        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    selectedRow(e) {
        const { value, checked } = e.target;
        if (checked === true) {
            this.props.addToCart(value);
        } else if (checked === false) {
            this.props.removeFromCart(value);
        }
    }

    render() {
        const { id, name, subject, errors, locked, isLoading, questions, tableColumns } = this.state;
        const { selectedItems } = this.props;
        return (
            <form key={id} onSubmit={id ? this.update : this.save}>
                <h5>{id ? "Update" : ""} Question Paper</h5>

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
                <CheckboxOrRadioButtonFieldGroup
                    key={locked}
                    disabled={false}
                    options={[1, 0]}
                    examQuestion={{
                        id: "locked",
                        question: "Locked",
                        option1: "Yes",
                        option2: "No",
                        type: "S"
                    }}
                    error={errors.locked}
                    answer={[locked]}
                    onChange={this.onChange}>
                </CheckboxOrRadioButtonFieldGroup>
                <Table
                    tableClass="table table-sm"
                    tableHeaderClass="table-primary"
                    tableData={questions}
                    tableColumns={tableColumns}
                    selectable={true}
                    selecteCallback={this.selectedRow}
                    selectedItems={selectedItems}
                ></Table>
                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary">{id ? "Update" : "Save"}</button>
                </div>
            </form>
        )
    }
}

QuestionPaperForm.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    getQuestionPaper: PropTypes.func.isRequired,
    saveQuestionPaper: PropTypes.func.isRequired,
    updateQuestionPaper: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired,
}

export default withRouter(QuestionPaperForm);