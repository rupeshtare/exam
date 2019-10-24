import validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
    let errors = {};

    if(validator.isEmpty(data.question)) {
        errors.question = "This field is required";
    }
    if(validator.isEmpty(data.option1)) {
        errors.option1 = "This field is required";
    }
    if(validator.isEmpty(data.option2)) {
        errors.option2 = "This field is required";
    }
    if(validator.isEmpty(data.option3)) {
        errors.option3 = "This field is required";
    }
    if(validator.isEmpty(data.option4)) {
        errors.option4 = "This field is required";
    }
    if(isEmpty(data.correct_answer)) {
        errors.correct_answer = "This field is required";
    }
    if(isEmpty(data.difficulty_level)) {
        errors.difficulty_level = "This field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
