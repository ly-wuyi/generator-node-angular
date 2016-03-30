/**
 * Created by ly on 2015/9/15.
 */
var fs = require('fs');
var path = require('path');

var mkdir = function (dist, callback) {
    var list = [];
    dist = path.resolve(dist);
    dist.split(/[\\\/]/)
        .reduce(function (first, second) {
            var _path = path.join(first, second);
            list.push(_path);
            return _path;
        });
    (function () {
        var args = arguments,
            _path = '';
        if (list.length > 0) {
            _path = list.shift();
            fs.exists(_path, function (exists) {
                if (exists) {
                    args.callee();
                } else {
                    fs.mkdir(_path, function (err) {
                        if (err) {
                            callback && callback(err);
                        } else {
                            args.callee();
                        }
                    })
                }
            });
        } else {
            callback && callback(null, _path);
        }
    })();
};
mkdir.sync = function (dist) {
    dist = path.resolve(dist);
    dist.split(/[\\\/]/)
        .reduce(function (first, second) {
            var _path = path.join(first, second);
            if (!fs.existsSync(_path)) {
                fs.mkdirSync(_path);
            }
            return _path;
        });
};
module.exports = mkdir;