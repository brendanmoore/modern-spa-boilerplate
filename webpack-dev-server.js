var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var openurl = require("openurl");

webpackConfig.entry.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");
webpackConfig.devtool = "inline-source-map";
webpackConfig.module.postLoaders = webpackConfig.module.postLoaders || [];
webpackConfig.module.postLoaders.push({ test: /components\/[^\/]+\.js$/, exclude: /node_modules/, loader: "react-hot" });
//overwrite with the sourcemap generating one with HM
webpackConfig.module.loaders[0].loader = "style!css?sourceMap!sass?outputStyle=expanded&includePaths[]=node_modules/compass-mixins/lib&sourceMap";
//remove the plugins
webpackConfig.plugins = [new webpack.HotModuleReplacementPlugin()];

var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {
    contentBase: "www/",
    hot: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    proxy: {
        "*": "http://localhost:3000"
    }
});
server.listen(8080, "localhost", function() {
    console.log("webpack dev server started: http://localhost:8080");
    openurl.open("http://localhost:8080");
});
