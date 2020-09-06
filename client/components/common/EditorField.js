import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";


const EditorField  = ({field, value, label, error, onInput, onBlurCallback}) => {
    return (        
        <div className="form-group">
            <label className="control-label">{label}</label>
            <div
                onInput={onInput}
                onBlur={onBlurCallback}
                dangerouslySetInnerHTML={{__html: value}}
                name={field}
                contentEditable={true}
                className={classnames("question-editor form-control", { "is-invalid": error })}>
            </div>
            { error && <div className="invalid-feedback">{error}</div> }
        </div>
    )
}

EditorField.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    onInput: PropTypes.func.isRequired,
    onBlurCallback: PropTypes.func
}

export default EditorField;