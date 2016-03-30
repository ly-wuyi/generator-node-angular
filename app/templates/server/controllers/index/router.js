/**
 * Created by ly on 2015/11/19.
 */
var path = require("path"),
    router = require(path.join(process.cwd(), "server/middleware/trouter")),
    indexService = require(path.join(process.cwd(), "server/service/index/service"));

router.post("/changePassword",function* (){
    var result = yield indexService.changePassword();
    this.body = {
        status: "SUCCEED"
    };
});

module.exports = router;