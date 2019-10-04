import express from "express";
import path from "path";

import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddelware from "webpack-hot-middleware";
import webpackConfig from "../webpack.config.dev";

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddelware(compiler));

app.get("/*", (req, res) => {
    // res.send("hello world");
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(3000, () => console.log("Running on localhost:3000"));