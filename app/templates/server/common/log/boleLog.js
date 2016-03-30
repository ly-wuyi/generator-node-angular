/**
 * Created by ly on 2015/8/18.
 */
var bole = require("bole");
    boleConsole = require("bole-console"),
    config = require("../../config");

var boleConsoleStream = boleConsole({
    timestamp: true,
    hostname: true,
    pid: true,
    requestDetails: true
});
bole.output([
    {level: "info", stream: boleConsoleStream }
]);
var boleLog = bole(config.log.appName);

module.exports = {
    boleLog: boleLog
};

