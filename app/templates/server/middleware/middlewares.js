/**
 * Created by ly on 2015/9/8.
 */
var path = require("path"),
    compose = require("./compose"),
    basePath = path.join(process.cwd(),"server/controllers");

/**
 * 路由配置
 * @returns {*}
 */
function routers(){
    var mildArr = new Array();

    mildArr.push(require(path.join(basePath, "/index/router")).routes());
    return compose(mildArr);
}

module.exports = routers;