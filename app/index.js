/**
 * Created by ly on 2016/1/27.
 */

var generators = require("yeoman-generator"),
    _ = require("lodash"),
    shell = require('shelljs');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },
    prompting: function () {
        var done = this.async();
        this.prompt({
            type: "input",
            name: "name",
            message: "Your project name",
            default: this.appname
        },function(answers){
            this.log(answers.name);
            this.config.set("projectName", answers.name);
            done();
        }.bind(this));
    },
    build: function(){
        this.appName = "nodeAngular";
        if (shell.which('git')) {
            var gitUrl = shell.exec('git config --get remote.origin.url', { silent: true, async: false}).output.trim();
            if(!gitUrl){
                this.log("Not a git repository!");
            }
            this.gitUrl = gitUrl;
        }else{
            this.log("The git command is invalid!");
        }
        this.template("package.json");
    }
});