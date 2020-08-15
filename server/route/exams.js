import express from "express";
import keys from "lodash/keys";
import forEach from "lodash/forEach";
import difference from "lodash/difference";

import Question from "../models/question";
import AnswerSheet from "../models/answerSheet";
import QuestionPaper from "../models/questionPaper";
import validateQuestionPaperInput from "../shared/validations/questionPaper";
import { map } from "lodash";
import question from "../models/question";

let router = express.Router();

// Save Exam
router.post("/", (req, res) => {
    // const { errors, isValid } = validateInput(req.body);
    const isValid = true
    if (isValid) {
        const { paper, answers } = req.body;
        const user = req.currentUser.id;

        Question.forge().where("id", "in", keys(answers)).fetchAll({ columns: ["id", "correct_answer"] })
            .then(
                questions => {
                    forEach(questions.toJSON(), val => {
                        let correct_answer = JSON.parse(val.correct_answer);
                        let given_answer = answers[val.id];
                        let result = correct_answer.length === given_answer.length && difference(correct_answer, given_answer).length === 0;
                        console.log({
                            question_paper: paper, question: val.id, answer: JSON.stringify(given_answer), user, result
                        });
                        AnswerSheet.forge({
                            question_paper: paper, question: val.id, answer: JSON.stringify(given_answer), user, result
                        }, { hasTimestamps: true }).save()
                    })

                    res.json({ success: true });
                }
            )
            .catch(
                err => { console.log(err); res.status(500).json({ error: err }) }
            );

    } else {
        res.status(400).json(errors);
    }
});

// Get Exam Results
router.get("/results", (req, res) => {
    const user = req.currentUser.id;

    AnswerSheet.collection()
        .query((qb) => {
            qb.select("question_paper", "user", "result")
            qb.groupBy("question_paper")
            qb.where("user", user)
            qb.where("result", 1)
            qb.count("result as total_marks")
        })
        .fetch()
        .then(
            results => res.json({ results })
        )
        .catch(
            error => res.status(500).json({ error })
        );
});

// Get All Question Papers
router.get("/questionPapers", (req, res) => {
    const user = req.currentUser.id;

    QuestionPaper
        .query({
            select: ["id", "name", "subject"],
            where: { locked: false, deleted: false }
        })
        .fetchAll()
        .then(
            questionPapers => res.json({ questionPapers })
        )
        .catch(
            error => res.status(500).json({ error })
        );
});

// Get Question Paper
router.get("/questionPaper/:identifier", (req, res) => {
    const { identifier } = req.params;

    // get question ids of given question paper
    QuestionPaper
        .query({
            select: ["questions"],
            where: { id: identifier }
        })
        .fetch()
        .then(paper => {
            const { questions } = paper.toJSON();

            // get questions from question ids
            Question.forge()
                .where("id", "in", JSON.parse(questions))
                .fetchAll({ columns: ["id", "question", "option1", "option2", "option3", "option4", "type"] })
                .then(questions => {
                    res.json({ questions });
                })

        }).catch((error) => {
            res.json({ error });
        })
});

// Create Question Paper
router.post("/questionPaper", (req, res) => {
    const { errors, isValid } = validateQuestionPaperInput(req.body);

    if (isValid) {
        const user = req.currentUser.id;
        let { name, subject, questions } = req.body;
        questions = JSON.stringify(questions);

        // get question ids of given question paper
        QuestionPaper.forge({
            name, subject, questions, user
        }, { hasTimestamps: true }).save()
            .then(
                paper => res.json({ success: true })
            )
            .catch(
                err => { console.log(err); res.status(500).json({ error: err }) }
            );

    } else {
        res.status(400).json(errors);
    }
});


// Get Answer Sheet of a given Paper
router.get("/answerSheet/:identifier", (req, res) => {
    const { identifier } = req.params;
    const user = req.currentUser.id;

    AnswerSheet
        .query({
            select: ["question", "answer", "result"],
            where: { question_paper: identifier, user: user }
        })
        .fetchAll()
        .then(answerSheet => {
            let answers = {}, results = {};

            answerSheet.forEach((v) => {
                answers[v.get("question")] = JSON.parse(v.get("answer"));
                results[v.get("question")] = v.get("result");
            })

            res.json({ answers, results });
        }).catch((error) => {
            console.log(error);
            res.json({ error });
        })
});

export default router;