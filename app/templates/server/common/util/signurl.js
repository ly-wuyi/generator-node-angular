/**
 * Created by ly on 15-7-13.
 */
var config = require("../../config"),
    signature = require("./signature"),
    querystring = require("querystring"),
    log = require("../log/boleLog").boleLog;

var getSignUrl = function(service,reqBody,originalUrl){
    var url = "";
    var appkey = config.appinfo.appkey;
    if(appkey){
        reqBody["appkey"] = appkey;
        if(Object.prototype.toString.call(reqBody) === "[object Object]"){
            var params = obj2arr(reqBody);
            var uri = signUri(service,originalUrl);
            var sign = signature(uri,params);
            reqBody["sign"] = sign;
            var queryStr = querystring.stringify(reqBody, null, null, { encodeURIComponent: function(a){
                return encodeURIComponent(a);
            }});
            var host = config[service]["host"];
            if(host){
                url = host + uri + "?" + queryStr;
            }else{
                log.error("signurl - host 不存在！");
            }
        }else{
            log.error("signurl - reqBody 非对象！");
        }
    }else{
        log.error("signAlgorithm - appkey 不存在！");
    }
    return url;
}

/**
 * 组装签名uri
 * @param service
 * @param originalUrl
 * @returns {*}
 */
var signUri = function(service,originalUrl){
    var signUri;
    if(originalUrl){
        var serviceUri = config[service]["uri"];
        if(serviceUri){
            var method = originalUrl.split("/").pop();
            signUri = serviceUri + method;
        }else{
            log.error(serviceUri + "signurl - serviceUri 不存在！");
        }
    }else{
        log.error("signurl - originalUrl 不存在！");
    }
    return signUri;
}

/**
 * 对象转换为 [key0=value0[,key1=value1]]
 * @param reqBody
 * @returns {Array}
 */
var obj2arr = function(reqBody){
    var params = [];
    for(var key in reqBody){
        params.push(key + "=" + reqBody[key]);
    }
    return params;
}

module.exports = getSignUrl;