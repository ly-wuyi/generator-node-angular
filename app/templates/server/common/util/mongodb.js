/**
 * Created by ly on 15-6-29.
 */
var config = require("/config"),
    log = require("bole")("mongoose"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://"+config.mongodb.host+":"+config.mongodb.port+"/"+config.mongodb.schema);
var mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'connection error:'));
mongodb.once('open', function (callback) {
    log.info("Mongodb open successful!");
});


module.exports = mongodb;