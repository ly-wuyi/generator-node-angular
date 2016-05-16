/**
 * Created by yong.liu on 2015/6/11.
 */
var fs = require("fs"),
    underscore = require("underscore");

var config = {};
var baseConfigFs = JSON.parse(fs.readFileSync('server/config.json'));
var nodeEnv = process.env.NODE_ENV || "production";
underscore.extend(config, baseConfigFs[nodeEnv]);
config.pkg = {};
var pkgFs = JSON.parse(fs.readFileSync("package.json"));
underscore.extend(config.pkg, pkgFs);

module.exports = config;