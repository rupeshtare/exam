import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const SelectFieldGroup = ({ field, value, label, error, options, onChange, onBlurCallback, multiple }) => {
    const selectOptions = options.map((o, i) =>
        <option value={o[0]} key={i}>{o[1]}</option>
    );

    return (
        <div className="form-group">
            <label className="control-label">{label}</label>
            <select
                onChange={onChange}
                onBlur={onBlurCallback}
                value={value}
                name={field}
                multiple={multiple}
                className={classnames("form-control", { "is-invalid": error })}>
                <option value="" disabled>Choose correct answer</option>
                {selectOptions}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

SelectFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlurCallback: PropTypes.func,
    multiple: PropTypes.bool
}

SelectFieldGroup.defaultProps = {
    multiple: false
}

export default SelectFieldGroup;