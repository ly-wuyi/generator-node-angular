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
        var prompts = [
            {
                type: "input",
                name: "appName",
                message: "Your project name",
                default: this.appname
            },
            {
                type: "input",
                name: "appDescription",
                message: "Your project description",
                default: "A node and angular module!"
            }
        ];
        this.prompt(prompts, function(answers){
            this.appName = answers.appName;
            this.appDescription = answers.appDescription;
            done();
        }.bind(this));
    },
    build: function(){
        var repositoryUrl = "",authorEmail = "";
        if (shell.which("git")) {
            repositoryUrl = shell.exec("git config --get remote.origin.url", { silent: true, async: false}).output.trim();
            authorEmail = shell.exec("git config --get user.email", { silent: true, async: false}).output.trim();
            if(!repositoryUrl){
                this.log("Not a git repository!");
            }
        }else{
            this.log("The git command is invalid!");
        }
        this.authorEmail = authorEmail;
        this.repositoryUrl = repositoryUrl;
        this.template("package.json");
    }
});