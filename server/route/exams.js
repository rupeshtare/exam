import express from "express";
import keys from "lodash/keys";
import forEach from "lodash/forEach";
import difference from "lodash/difference";

import Question from "../models/question";
import AnswerSheet from "../models/answerSheet";
import QuestionPaper from "../models/questionPaper";
import validateInput from "../shared/validations/question";
import { map } from "lodash";

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
            select: ["id"]
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
})

// Create Question Paper
router.post("/questionPaper", (req, res) => {
    const user = req.currentUser.id;

    // get question ids of given question paper
    Question
        .query('orderBy', 'id', 'desc')
        .query('limit', '5')
        .fetchAll()
        .then(questions => {
            questions = JSON.stringify(map(questions.toJSON(), o => o.id));

            QuestionPaper
                .forge({
                    questions, user
                }, { hasTimestamps: true })
                .save();

            res.json({ questions });
        }).catch((error) => {
            res.json({ error });
        })
})


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
})

export default router;