/**
 * Created by ly on 2015/11/16.
 */
var path = require("path"),
    request = require(path.join(process.cwd(), "server/common/util/request")),
    signUrl = require(path.join(process.cwd(), "server/common/util/signurl")),
    config = require(path.join(process.cwd(), "server/config")),
    uid = require('rand-token').uid;

/**
 *  登录
 * @param next
 */
function *signin(params){
    return {
        status: "SUCCEED",
        admin: 1
    };
}

module.exports = {
    signin: signin
};