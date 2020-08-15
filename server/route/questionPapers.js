import express from "express";
import QuestionPaper from "../models/questionPaper";
import validateQuestionPaperInput from "../shared/validations/questionPaper";

let router = express.Router();

// Get All Question Papers
router.get("/", (req, res) => {
    const user = req.currentUser.id;

    QuestionPaper
        .query({
            select: ["id", "name", "subject", "locked"]
        })
        .fetchAll()
        .then(
            questionPapers => res.json({ questionPapers })
        )
        .catch(
            error => res.status(500).json({ error })
        );
});

// Get Question Paper of given id
router.get("/:identifier", (req, res) => {
    const { identifier } = req.params;

    QuestionPaper
        .query({
            select: ["name", "subject", "questions", "locked"],
            where: { id: identifier }
        })
        .fetch()
        .then(paper => {
            let { questions, ...rest } = paper.toJSON();
            questions = JSON.parse(questions);
            res.json({ ...rest, questions });
        }).catch((error) => {
            res.json({ error });
        })
});

// Create Question Paper
router.post("/", (req, res) => {
    const { errors, isValid } = validateQuestionPaperInput(req.body);

    if (isValid) {
        const user = req.currentUser.id;
        let { name, subject, questions, locked } = req.body;
        questions = JSON.stringify(questions);

        QuestionPaper.forge({
            name, subject, questions, locked, user
        }, { hasTimestamps: true }).save()
            .then(
                paper => res.json({ success: true })
            )
            .catch(
                err => { res.status(500).json({ error: err }) }
            );

    } else {
        res.status(400).json(errors);
    }
});

// Update Question Paper of a given id
router.put("/", (req, res) => {
    const { errors, isValid } = validateQuestionPaperInput(req.body);

    if (isValid) {
        const user = req.currentUser.id;
        let { id, name, subject, questions, locked } = req.body;
        questions = JSON.stringify(questions);

        QuestionPaper
            .forge({ id })
            .save({ name, subject, questions, locked })
            .then(
                paper => res.json({ success: true })
            )
            .catch(
                err => { res.status(500).json({ error: err }) }
            );

    } else {
        res.status(400).json(errors);
    }
});
export default router;