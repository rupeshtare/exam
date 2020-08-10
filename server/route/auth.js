import express from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

let router = express.Router();

router.post("/", (req, res) => {
    const { identifier, password } = req.body;

    User.query({
        where: { email: identifier },
        orWhere: { username: identifier }
    }).fetch().then(user => {
        if (bcrypt.compareSync(password, user.get("password_digest"))) {
            if (user.get("is_active") !== 1) {
                // check user is active or not.
                res.status(401).json({ errors: { form: "User is not active." } });
            } else {
                const token = jwt.sign({
                    id: user.get("id"),
                    username: user.get("username"),
                    role: user.get("role")
                }, config.jwtSecret);
                res.json({ token });
            }
        } else {
            res.status(401).json({ errors: { form: "Invalid credentials" } });
        }
    }).catch(err => {
        res.status(401).json({ errors: { form: "Invalid credentials" } });
    });

});

export default router;