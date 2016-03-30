/**
 * Created by yong.liu on 2015/9/18.
 */
var path = require("path"),
    router = require(path.join(process.cwd(), "server/middleware/trouter")),
    signinService = require(path.join(process.cwd(), "server/service/signin/service"));

router.post("/signin",function*(next){
    var reqData = this.request.body;
    var userName = reqData.userName;
    var password = reqData.password;
    var result = yield signinService.signin({username: userName, password: password});
    if(result.status == "SUCCEED"){
        this.session.admin = result.admin;
        this.body = {status : true};
    }else if(result.status == "FAILED"){
        this.body=result;
    }else{
        this.body = {
            status : false,
            errorCode : "USER.0001",
            errorMessage : "login failed",
            errorMessageZh : "登录失败"
        }
    }
});

/**
 * 登出
 */
router.post("/logout",function*(){
    this.session = null;
    this.body = {
        status : true
    };
});

module.exports = router;