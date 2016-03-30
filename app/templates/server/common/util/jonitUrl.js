/**
 * Created by MXH on 2015/11/12.
 */
var config = require("../../config"),
    querystring = require("querystring"),
    log = require("../log/boleLog").boleLog;

var joinUrl = function(service,methodName,reqBody){
    var url = config[service]["baseUrl"] + (methodName ? methodName : ""),
        queryStr = querystring.stringify(reqBody);
    return url + (queryStr ? "?" + queryStr : "");
};

module.exports = joinUrl;
