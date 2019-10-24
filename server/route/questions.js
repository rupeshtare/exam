import express from "express";

import Question from "../models/question";
import validateInput from "../shared/validations/question";

let router = express.Router();

router.post("/", (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if(isValid) {
        const { question, option1, option2, option3, option4, difficulty_level } = req.body;
        let { correct_answer } = req.body;
        const type = correct_answer.length > 1 ? "M" : "S";
        correct_answer = JSON.stringify(correct_answer);
        
        Question.forge({
            question, option1, option2, option3, option4, correct_answer, type, difficulty_level
        }, { hasTimestamps: true }).save()
            .then(
                question => res.json({ success: true })
            )
            .catch(
                err => res.status(500).json({ error: err })
            );

    } else {
        res.status(400).json(errors);
    }
});

export default router;