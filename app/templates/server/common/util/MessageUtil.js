/**
 * 用于错误代码转换
 * Created by MXH on 2015/8/24.
 */

var fs = require("fs");
/**
 *
 * @param path 错误JSON,不传默认使用app/errorCode.json
 * @returns {MessageUtil}
 * @constructor
 */
function MessageUtil(path){
    this.errorMap = {};
    if(!(this instanceof MessageUtil)){
        return new MessageUtil(path);
    }else{
        this.errorMap = JSON.parse(fs.readFileSync(path ? path : './server/errorCode.json'));
    }
}

/**
 * 根据errorCode取得错误信息
 * 不传或者没有找到对应errorCode返回空字符串
 */
MessageUtil.prototype.getMessage = function(errorCode){
    var errorMessage = "";
    if(typeof errorCode === "string"){
        errorMessage = this.errorMap[errorCode];
    }
    return errorMessage ? errorMessage : "";
};

module.exports = MessageUtil;



