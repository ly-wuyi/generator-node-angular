/**
 * Created by ly on 2016/1/27.
 */

var generators = require("yeoman-generator"),
    _ = require("lodash");

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
            done();
        }.bind(this));
    }
});