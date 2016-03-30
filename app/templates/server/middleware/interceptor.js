/**
 * Created by MXH on 2015/9/24.
 */

module.exports = function(){
    return function *(next){
        var isAjax = false;
        try {
            isAjax = ("XMLHttpRequest" === this.req.headers["x-requested-with"]);
            yield next;
        } catch (err) {
            this.app.emit('error', err, this);
            if(isAjax){
                this.body = {
                    status : false,
                    errorCode : "",
                    errorMessage : "system error",
                    errorMessageZh : "系统错误"
                };
            }else{
                this.redirect("/logout");
            }
        }
    }
};
