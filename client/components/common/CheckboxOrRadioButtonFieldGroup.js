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
        const { examQuestion, questionNo, onChange, result, answer, options, disabled } = this.props
        const { id, question, type } = examQuestion;
        const fieldType = type == "S" ? "radio" : "checkbox";

        const optionTags = options.map((column, index) =>
            <CheckboxOrRadioButtonField
                key={index}
                field={id}
                value={column}
                label={examQuestion[`option${index + 1}`]}
                type={fieldType}
                checked={answer.includes(column.toString()) || answer.includes(column)}
                disabled={disabled}
                onChange={onChange}>
            </CheckboxOrRadioButtonField>
        );

        return (
            <div className="card">
                <div className="card-body">
                    <div className={classnames("card-title", { "text-danger": result === 0, "text-success": result === 1 })}>
                        {questionNo !== null ? <b>Question {questionNo} - <b  dangerouslySetInnerHTML={{__html: question}}></b></b> : question}
                    </div>
                    <div className="text-muted">
                        {optionTags}
                    </div>
                </div>
            </div>
        )
    }
}

CheckboxOrRadioButtonFieldGroup.propTypes = {
    examQuestion: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    questionNo: PropTypes.number,
    result: PropTypes.number,
    answer: PropTypes.array,
    options: PropTypes.array,
    disabled: PropTypes.bool,
}

CheckboxOrRadioButtonFieldGroup.defaultProps = {
    questionNo: null,
    answer: [],
    options: [1, 2, 3, 4],
    disabled: true,
}

export default withRouter(CheckboxOrRadioButtonFieldGroup);