import express from "express";

import Question from "../models/question";
import validateInput from "../shared/validations/question";

let router = express.Router();

function getQuestionData(req) {
    let { correct_answer, ...rest } = req.body;
    const type = correct_answer.length > 1 ? "M" : "S";
    correct_answer = JSON.stringify(correct_answer);
    const updated_by = req.currentUser.id;

    return { ...rest, correct_answer, type, updated_by }
}

// Save Question
router.post("/", (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if (isValid) {
        let { question, option1, option2, option3, option4, correct_answer, type, difficulty_level, updated_by } = getQuestionData(req);
        const created_by = req.currentUser.id;

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


// Get all Questions 
router.get("/", (req, res) => {
    let { page, pageSize } = req.query;
    page = page !== undefined ? page : 1;
    pageSize = pageSize !== undefined ? pageSize : 10;
    Question.where({ deleted: false })
        .fetchPage({ pageSize, page })
        .then(
            questions => res.json({ questions: questions, pagination: questions.pagination })
        )
        .catch(
            err => res.status(500).json({ error: err })
        );
});


// Get Question of a given id
router.get("/:identifier", (req, res) => {
    const { identifier } = req.params;

    Question
        .query({
            select: ["correct_answer", "difficulty_level", "option1", "option2", "option3", "option4", "question", "type"],
            where: { id: identifier }
        })
        .fetch()
        .then(
            result => {
                let { correct_answer, ...rest } = result.toJSON();
                correct_answer = JSON.parse(correct_answer);
                res.json({ correct_answer, ...rest });
            }
        )
        .catch(
            error => { console.log(error); res.status(404).json({ error }); }
        )
});

// Update Question of a given id
router.put("/", (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if (isValid) {
        let { id, question, option1, option2, option3, option4, correct_answer, type, difficulty_level, updated_by } = getQuestionData(req);
        const created_by = req.currentUser.id;

        Question.forge({ id })
            .save({ question, option1, option2, option3, option4, correct_answer, type, difficulty_level, created_by, updated_by })
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

// Delete Question of a given id
router.delete("/", (req, res) => {

    let { questions } = req.body;
    const updated_by = req.currentUser.id;

    Question.where("id", "in", questions)
        .save({ deleted: true }, { method: 'update', patch: true })
        .then(
            question => res.json({ success: true })
        )
        .catch(
            err => res.status(500).json({ error: err })
        );
});

export default router;