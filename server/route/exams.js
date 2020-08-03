import express from "express";
import keys from "lodash/keys";
import forEach from "lodash/forEach";
import difference from "lodash/difference";

import Question from "../models/question";
import Exams from "../models/exam";
import validateInput from "../shared/validations/question";

let router = express.Router();

router.post("/", (req, res) => {
    // const { errors, isValid } = validateInput(req.body);
    const isValid = true
    if (isValid) {
        const { answers } = req.body;
        const user = req.currentUser.id;

        Question.forge().where("id", "in", keys(answers)).fetchAll({ columns: ["id", "correct_answer"] })
            .then(
                questions => {
                    forEach(questions.toJSON(), val => {
                        let correct_answer = JSON.parse(val.correct_answer);
                        let given_answer = answers[val.id];
                        let result = correct_answer.length === given_answer.length && difference(correct_answer, given_answer).length === 0;
                        let question = val.id;
                        let answer = JSON.stringify(given_answer);

                        Exams.forge({
                            question, answer, user, result
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

export default router;