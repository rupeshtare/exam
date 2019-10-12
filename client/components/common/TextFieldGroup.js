import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup  = ({field, value, label, error, type, onChange}) => {
    return (        
        <div className="form-group">
            <label className="control-label">{label}</label>
            <input
                onChange={onChange}
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
    onChange: PropTypes.func.isRequired
}

TextFieldGroup.defaultProps = {
    type: "text"
}

export default TextFieldGroup;