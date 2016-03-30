/**
 * Created by ly on 2015/6/27.
 */
var config = require("/config"),
    redis = require("redis");
var options = {

};
var redisdb = redis.createClient(config.redis.port, config.redis.hostname, options);

module.exports = redisdb;