import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";

import CheckboxOrRadioButtonField from "../common/CheckboxOrRadioButtonField";

class CheckboxOrRadioButtonFieldGroup extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { examQuestion, questionNo, onChange, result, answer } = this.props
        const { id, question, option1, option2, option3, option4, type } = examQuestion;
        const fieldType = type == "S" ? "radio" : "checkbox"

        return (
            <div className="card">
                <div className="card-body">
                    <div className={classnames("card-title", { "text-danger": result === 0, "text-success": result === 1 })}><b>Question {questionNo} - {question}</b></div>
                    <div className="text-muted">
                        <CheckboxOrRadioButtonField
                            field={id}
                            value={1}
                            label={option1}
                            type={fieldType}
                            checked={answer.includes("1")}
                            disabled={!isEmpty(answer)}
                            onChange={onChange}>
                        </CheckboxOrRadioButtonField>
                        <CheckboxOrRadioButtonField
                            field={id}
                            value={2}
                            label={option2}
                            type={fieldType}
                            checked={answer.includes("2")}
                            disabled={!isEmpty(answer)}
                            onChange={onChange}>
                        </CheckboxOrRadioButtonField>
                        <CheckboxOrRadioButtonField
                            field={id}
                            value={3}
                            label={option3}
                            type={fieldType}
                            checked={answer.includes("3")}
                            disabled={!isEmpty(answer)}
                            onChange={onChange}>
                        </CheckboxOrRadioButtonField>
                        <CheckboxOrRadioButtonField
                            field={id}
                            value={4}
                            label={option4}
                            type={fieldType}
                            checked={answer.includes("4")}
                            disabled={!isEmpty(answer)}
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
    onChange: PropTypes.func.isRequired,
    result: PropTypes.number,
    answer: PropTypes.array,
}

CheckboxOrRadioButtonFieldGroup.defaultProps = {
    answer: []
}

export default withRouter(CheckboxOrRadioButtonFieldGroup);