/**
 * Created by ly on 2015/9/8.
 */
/**
 * 组装中间件
 * @param middleware
 * @returns {Function}
 */
function compose(middleware){
    return function *(next){
        if (!next) next = noop();
        var i = middleware.length;
        while (i--) {
            next = middleware[i].call(this, next);
        }
        yield *next;
    }
}

function *noop(){}

module.exports = compose;