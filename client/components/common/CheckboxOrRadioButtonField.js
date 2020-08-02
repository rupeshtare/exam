import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const CheckboxOrRadioButtonField = ({ field, type, value, label, error, onChange }) => {
    return (
        <div className="form-check">
            <input
                type={type}
                name={field}
                value={value}
                onChange={onChange}
                className={classnames("form-check-input", { "is-invalid": error })}>
            </input>
            <label className="form-check-label">{label}</label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

CheckboxOrRadioButtonField.propTypes = {
    field: PropTypes.any.isRequired,
    type: PropTypes.string,
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

CheckboxOrRadioButtonField.defaultProps = {
    type: "checkbox"
}

export default CheckboxOrRadioButtonField;