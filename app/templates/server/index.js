/**
 * Created by yong.liu on 2015/6/11.
 */
var os = require("os"),
    fs = require("fs"),
    path = require("path"),
    app = require("koa")(),
    compress = require("koa-compress"),
    session = require("koa-generic-session"),
    redisStore = require("koa-redis"),
    render = require('koa-ejs'),
    favicon = require("koa-favi"),
    serve = require("koa-static"),
    staticCache = require("koa-static-cache"),
    bodyParser = require("koa-bodyparser"),
    config = require("./config"),
    middlewares = require("./middleware/middlewares"),
    koaPolice  = require('koa-police'),
    strategy = require("./middleware/strategy"),
    interceptor = require("./middleware/interceptor"),
    multer = require('koa-multer'),
    mkdir = require("./common/util/mkdir");

app.use(compress({
    filter: function (content_type) {
        //return /text/i.test(content_type)
        return true;
    },
    threshold: 2048,
    flush: require("zlib").Z_SYNC_FLUSH
}));

app.use(favicon());
app.keys = ["manage-portal-session"];
app.use(session({
    key : "manage-portal-session",
    store: redisStore({
        //client: config.redis.client,
        host: config.redis.hostname,
        prot: config.redis.port,
        socket: config.redis.socket,
        db: config.redis.db,
        pass: config.redis.pass
    }),
    cookie : {
        path: "/",
        httpOnly: true,
        maxage: config.sessionTime,
        rewrite: true,
        signed: true
    },
    ttl : null
}));

render(app, {
    root: path.join(process.cwd(), 'client'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true,
    filters: require('./filter/filters')
});

app.use(bodyParser());

app.use(serve(path.join(process.cwd(), "client"),{index: false}));
app.use(serve(path.join(process.cwd(), "bower_components"),{index: false}));
app.use(staticCache(path.join(process.cwd(), "client"), {
    maxAge: 365 * 24 * 60 * 60
}));

app.use(require("./controllers/signin/router").routes());

app.use(koaPolice({
    defaultStrategies: [strategy()],
    policies: [
        {path: /.*/, scope: 'admin',enforce: false}
    ]
}));

app.use(function *(next) {
    this.tmpdir = path.join(os.tmpdir(),path.sep + config.appinfo.appkey);
    var stats = fs.existsSync(this.tmpdir);
    if(!stats){
        mkdir(this.tmpdir);
    }
    if(this.state.admin){
        if(this.path.match(/^\/$/)){
            yield this.render("index",{brand: config.brand});
        }else{
            yield next;
        }
    }else{
        this.set("api",true);
        yield this.render("signin",{brand: config.brand});
    }
});

app.use(multer({ dest: path.join(os.tmpdir(),path.sep + config.appinfo.appkey)}));

app.use(middlewares());

module.exports = app;
