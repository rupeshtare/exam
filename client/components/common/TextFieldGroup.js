import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup  = ({field, value, label, error, type, onChange, checkUserExists}) => {
    return (        
        <div className="form-group">
            <label className="control-label">{label}</label>
            <input
                onChange={onChange}
                onBlur={checkUserExists}
                value={value}
                type={type}
                name={field}
                className={classnames("form-control", { "is-invalid": error })}>
            </input>
            { error && <div className="invalid-feedback">{error}</div> }
        </div>
    )
}

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checkUserExists: PropTypes.func
}

TextFieldGroup.defaultProps = {
    type: "text"
}

export default TextFieldGroup;