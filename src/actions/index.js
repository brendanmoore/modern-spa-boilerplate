// Uses ES7 export from proposal. babel-preset-stage-1
// We want this to work now.
//export * from "./data";
module.exports = Object.assign({}, require("./data"));
