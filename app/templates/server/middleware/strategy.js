/**
 * Created by MXH on 2015/9/23.
 * 权限策略
 */

function strategyFacotry(){
    var strategy = {
        name : "session",
        authenticate: function *(context, scope) {
            if (scope === 'admin' && !!context.session && !context.session.admin) {
                return false;
            }else{
                return true;
            }
        }
    };
    return strategy;
}

module.exports = strategyFacotry;
