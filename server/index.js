import express from "express";
import path from "path";
import bodyParser from "body-parser";

import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddelware from "webpack-hot-middleware";
import webpackConfig from "../webpack.config.dev";
import authenticate from "./middlewares/authenticate";

import users from "./route/users";
import auth from "./route/auth";
import questions from "./route/questions";
import exams from "./route/exams";

const app = express();

app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/questions", authenticate, questions);
app.use("/api/exams", authenticate, exams);

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddelware(compiler));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(3000, () => console.log("Running on localhost:3000"));