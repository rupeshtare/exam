import path from "path";
import webpack from "webpack";

export default {
    mode: "development",
    devtool: "eval-source-map",
    entry: [
        "webpack-hot-middleware/client",
        path.join(__dirname, "client/custom.scss"),
        path.join(__dirname, "client/index.js"),
    ],
    output: {
        path: "/",
        publicPath: "/"
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, "client"),
                loaders: [ "babel-loader" ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                loaders: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ]
            }
        ]
    },
    resolve: {
        extensions: [ ".js" ]
    }
}