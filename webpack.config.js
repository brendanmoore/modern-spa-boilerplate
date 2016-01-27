/*eslint no-var:0*/
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = {
    entry: ["./src/app.js"],
    output: {
        path: path.resolve(__dirname, "www"),
        filename: "js/bundle.js"
    },
    module: {
        loaders: [
            {   //this one is first, we reference it in the development section.
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css!sass?outputStyle=compact&includePaths[]=node_modules/compass-mixins/lib", { allChunks: true })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ["react", "es2015"],
                    plugins: ["transform-runtime"]
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract inline css into separate css file
        new ExtractTextPlugin("css/style.css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
            }
        })
    ]
};

module.exports = webpackConfig;
