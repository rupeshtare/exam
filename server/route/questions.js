import express from "express";

import Question from "../models/question";
import validateInput from "../shared/validations/question";

let router = express.Router();

router.post("/", (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if (isValid) {
        const { question, option1, option2, option3, option4, difficulty_level } = req.body;
        let { correct_answer } = req.body;
        const type = correct_answer.length > 1 ? "M" : "S";
        correct_answer = JSON.stringify(correct_answer);
        const created_by = req.currentUser.id;
        const updated_by = req.currentUser.id;

        Question.forge({
            question, option1, option2, option3, option4, correct_answer, type, difficulty_level, created_by, updated_by
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

router.get("/", (req, res) => {
    let { page, pageSize } = req.query;
    page = page !== undefined ? page : 1;
    pageSize = pageSize !== undefined ? pageSize : 10;
    Question.fetchPage({ pageSize, page })
        .then(
            questions => res.json({ questions: questions, pagination: questions.pagination })
        )
        .catch(
            err => res.status(500).json({ error: err })
        );
});

export default router;