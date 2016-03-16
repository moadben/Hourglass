var mergeTrees = require('broccoli-merge-trees');
var fastBrowserify = require('broccoli-fast-browserify');
var babelTranspiler = require("broccoli-babel-transpiler");
var babelify = require('babelify');


var scriptTree = babelTranspiler('js');
module.exports = scriptTree;