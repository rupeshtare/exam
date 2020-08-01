import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextareaFieldGroup  = ({field, value, label, error, onChange, onBlurCallback}) => {
    return (        
        <div className="form-group">
            <label className="control-label">{label}</label>
            <textarea
                onChange={onChange}
                onBlur={onBlurCallback}
                value={value}
                name={field}
                className={classnames("form-control", { "is-invalid": error })}>
            </textarea>
            { error && <div className="invalid-feedback">{error}</div> }
        </div>
    )
}

TextareaFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlurCallback: PropTypes.func
}

export default TextareaFieldGroup;