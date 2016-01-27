//Little helper to fix timezone issues
process.env.TZ = "UTC";

const options = {};
if (/^v5\./.test(process.version)) {
    options.presets = ["babel-preset-react", "babel-preset-node5"];
}
require("babel-register", options);
require("./src/shim/webpack.shim.js");
require("./src/server.js");