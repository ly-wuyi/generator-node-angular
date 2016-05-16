/**
 * Created by yong.liu on 2015/6/11.
 */
var app = require("./index"),
    http = require("http"),
    config = require("./config");

var cluster = require("cluster"),
    timeouts = [];
function errorMsg() {
    //cluster.fork();
    console.error("Something must be wrong with the connection ...");
}

function startWork(){
    var worker = cluster.fork();
    console.log('CLUSTER: Worker %d started', worker.id);
}

if(cluster.isMaster){
    var numCPUs = require('os').cpus().length
    for(var i = 0; i<numCPUs; i++){
        var worker = cluster.fork();
        worker.on('message', function(message){
            console.log(message.from + ': ' + message.type + ' ' + message.data.number + ' = ' + message.data.result);
        });
    }
    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });
    cluster.on('fork', function(worker) {
        timeouts[worker.id] = setTimeout(errorMsg, 2000);
    });
    cluster.on('listening', function(worker, address) {
        console.log("A worker #" + worker.id + " is now connected to " + address.address + ":" + address.port);
        clearTimeout(timeouts[worker.id]);
    });
    cluster.on('exit', function(worker, code, signal) {
        clearTimeout(timeouts[worker.id]);
        startWork();
    });

    cluster.on('disconnect', function(worker) {
        console.log('The worker #' + worker.id + ' has disconnected');
    });
}else{
    http.createServer(app.callback()).listen(config.port);
    console.log(config.pkg.name + " is listening on http://" + config.ip + ":" + config.port);
}