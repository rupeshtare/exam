import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import CheckboxOrRadioButtonField from "../common/CheckboxOrRadioButtonField";

class CheckboxOrRadioButtonFieldGroup extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { examQuestion, questionNo, onChange } = this.props
        const { id, question, option1, option2, option3, option4, type } = examQuestion;
        const fieldType = type == "S" ? "checkbox" : "radio"

        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title"><b>Question {questionNo} - {question}</b></div>
                    <div className="text-muted">
                        <CheckboxOrRadioButtonField
                            field={id}
                            value={1}
                            label={option1}
                            type={fieldType}
                            onChange={onChange}>
                        </CheckboxOrRadioButtonField>
                        <CheckboxOrRadioButtonField
                            field={id}
                            value={2}
                            label={option2}
                            type={fieldType}
                            onChange={onChange}>
                        </CheckboxOrRadioButtonField>
                        <CheckboxOrRadioButtonField
                            field={id}
                            value={3}
                            label={option3}
                            type={fieldType}
                            onChange={onChange}>
                        </CheckboxOrRadioButtonField>
                        <CheckboxOrRadioButtonField
                            field={id}
                            value={4}
                            label={option4}
                            type={fieldType}
                            onChange={onChange}>
                        </CheckboxOrRadioButtonField>
                    </div>
                </div>
            </div>
        )
    }
}

CheckboxOrRadioButtonFieldGroup.propTypes = {
    examQuestion: PropTypes.object.isRequired,
    questionNo: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default withRouter(CheckboxOrRadioButtonFieldGroup);