import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const CheckboxOrRadioButtonField = ({ field, type, value, label, error, onChange, checked, disabled }) => {
    return (
        <div className="form-check">
            <input
                type={type}
                name={field}
                value={value}
                defaultChecked={checked}
                disabled={disabled}
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
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
}

CheckboxOrRadioButtonField.defaultProps = {
    type: "checkbox"
}

export default CheckboxOrRadioButtonField;