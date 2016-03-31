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
                message: "Your project name?",
                default: this.appname
            },
            {
                type: "input",
                name: "appDescription",
                message: "Your project description?",
                default: "A node and angular module!"
            },
            {
                type: "input",
                name: "appKeywords",
                message: "Your project keywords?",
                filter: function(item){
                    if(typeof item == "string"){
                        item = item.split(",");
                    }
                    return item.map(function(val){
                        return val.trim();
                    }).filter(function(val){
                        return val.length>0;
                    });
                }
            },
            {
                type: "confirm",
                name: "skipInstall",
                message: "Skip install dependencies?",
                default: true
            }
        ];
        this.prompt(prompts, function(answers){
            this.appName = answers.appName;
            this.appDescription = answers.appDescription;
            this.appKeywords = answers.appKeywords;
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
        this.template("bower.json");
        this.copy(".gitignore");
        this.copy("Gruntfile.js");
        this.directory("server","server");
        this.directory("client","client");
        this.directory("test","test");
    },
    install: function(){
        this.installDependencies({
            npm: true,
            bower: true
        });
    }
});