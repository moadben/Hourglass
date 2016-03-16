var babelTranspiler = require("broccoli-babel-transpiler");


var scriptTree = babelTranspiler('js');
module.exports = scriptTree;