import validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
    let errors = {};

    if(validator.isEmpty(data.name)) {
        errors.name = "This field is required";
    }
    if(validator.isEmpty(data.subject)) {
        errors.subject = "This field is required";
    }
    if(isEmpty(data.questions)) {
        errors.form = "Please add questions into cart.";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}
