/**
 * Created by ly on 2016/3/30.
 */
var underscore = require("underscore");
var path = require("path"),
    fs = require('fs'),
    request = require(path.join(process.cwd(), "server/common/util/request")),
    signUrl = require(path.join(process.cwd(), "server/common/util/signurl"));

/**
 *  修改密码
 * @param next
 */
function *changePassword(params){
    return {
        status: "SUCCEED"
    };
}

module.exports = {
    changePassword: changePassword
};