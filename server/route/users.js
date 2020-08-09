import express from "express";
import commonValidations from "../shared/validations/signup";
import bcrypt from "bcrypt";
import isEmpty from "lodash/isEmpty";

import User from "../models/user";

let router = express.Router();

function validateInput(data, otherValidations) {
    let { errors, isValid } = otherValidations(data);

    return User.query({
        where: { email: data.email },
        orWhere: { username: data.username }
    }).fetch().then(user => {
        if (user) {
            if (user.get("username") === data.username) {
                errors.username = "There is user with such username";
            }
            if (user.get("email") === data.email) {
                errors.email = "There is user with such email"
            }
        }
        return {
            errors,
            isValid: isEmpty(errors)
        };
    }).catch(() => {
        return { errors, isValid };
    });
}

router.get("/:identifier", (req, res) => {
    const { identifier } = req.params;
    User.query({
        select: ["username", "email"],
        where: { email: identifier },
        orWhere: { username: identifier }
    }).fetch().then(user => {
        res.json({ user });
    }).catch(() => {
        res.json({});
    })
})

router.post("/", (req, res) => {
    validateInput(req.body, commonValidations)
        .then(({ errors, isValid }) => {
            if (isValid) {
                const { username, password, timezone, email } = req.body;
                const password_digest = bcrypt.hashSync(password, 10);

                User.forge({
                    username, email, timezone, password_digest
                }, { hasTimestamps: true }).save()
                    .then(
                        user => res.json({ success: true })
                    )
                    .catch(
                        err => res.status(500).json({ error: err })
                    );

            } else {
                res.status(400).json(errors);
            }
        });
});

export default router;