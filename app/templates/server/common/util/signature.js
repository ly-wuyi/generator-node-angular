/**
 * Created by ly on 15-7-9.
 */
var util = require('util'),
    crypto = require("crypto"),
    config = require("../../config");

/**
 * 签名算法
 * @param uri
 * @param params
 * @returns {string}
 */
var signAlgorithm = function(uri, params){
    var sign = "";
    if(util.isArray(params)){
        var sequenceParams = params.sort();
        var paramStr = sequenceParams.join("_");
        var uriAndParam = uri + "_" + paramStr + "_" + config.appinfo.secretkey;
        var encodeUri = encodeURIComponent(uriAndParam);
        sign = secretAlgorithm("md5",encodeUri);
    }else{
        this.throw(500, "signAlgorithm - params 必须为数组！");
    }
    return sign;
}

/**
 * 加密算法
 * @param algorithm
 * @param param
 */
var secretAlgorithm = function(algorithm, param){
    if(!algorithm){
        algorithm = "md5";
    }
    var algorithmFunc = crypto.createHash("md5");
    algorithmFunc.update(param);
    return algorithmFunc.digest('hex');
}

/**
 * md5 helper
 *
 * @param {String} str
 * @param {String} encoding (optional)
 * @api private
 *
 */
function md5(str, encoding){
    return crypto
        .createHash('md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
};

module.exports = signAlgorithm;

