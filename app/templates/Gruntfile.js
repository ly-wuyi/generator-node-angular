/**
 * Created by ly on 2015/7/23.
 */
"use strict";

var serveStatic = require('serve-static'),
    request = require('request'),
    bodyParser = require('body-parser');
module.exports = function(grunt){
    var date = '';
    var time = new Date();
    var beginMonth = time.getMonth()+1;
    var beginDate = time.getDate();
    beginMonth = beginMonth;
    beginDate = beginDate;
    date=time.getFullYear()+'-'+beginMonth+'-'+beginDate;
    //加载所有任务
    require("load-grunt-tasks")(grunt);

    //显示任务执行消耗的时间
    require("time-grunt")(grunt);

    //任务配置数据
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            bower: {
                files: ["bower.json"],
                tasks: ["wiredep"]
            },
            js: {
                files: ["client/modules/{,**/}*.js"],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    "client/{,**/}*.*"
                ]
            },
            foton_less:{
                files:"./client/less/{,**/}*.less",
                tasks: ["less:foton"]
            },
            cowin_less:{
                files:"./client/less/{,**/}*.less",
                tasks: ["less:cowin"]
            }
        },
        less: {
            foton: {
                options:{
                    modifyVars: {
                        theme: "foton"
                    }
                },
                files: [{
                    expand: true,
                    cwd: "./client/less",
                    src: ["style.less"],
                    dest: "./client/css",
                    ext: ".css"
                }]
            },
            cowin: {
                options:{
                    modifyVars: {
                        theme: "cowin"
                    }
                },
                files: [{
                    expand: true,
                    cwd: "./client/less",
                    src: ["style.less"],
                    dest: "./client/css",
                    ext: ".css"
                }]
            }
        },
        wiredep: {
            client: {
                src: [
                    "client/{,**/}*.html"
                ],
                ignorePath:  /(\.\.\/)+bower_components\//
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: "localhost",
                livereload: 35729
            },
            livereload: {
                options: {
                    open: {
                        target: "http://localhost:9000/signin.html"
                    },
                    middleware: function (connect, options, middlewares) {
                        return [
                            connect().use("/",serveStatic("./bower_components")),
                            connect().use(bodyParser.urlencoded()),
                            function(req, res, next) {
                                var url = req.url;
                                if (url.indexOf(".")>0 || url=="/") {
                                    next();
                                    return;
                                }
                                request({
                                        uri:  "http://localhost:3000"+ req.url,
                                        method: "POST",
                                        form: req.body,
                                        json: true
                                    },
                                    function (error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        res.end(JSON.stringify(body));
                                    }else{
                                        res.end("error");
                                    }
                                });
                            },
                            serveStatic("client")
                        ];
                    }
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        ".tmp",
                        "dist"
                    ]
                }]
            },
            server: ".tmp",
            build: {
                files: [{
                    dot: true,
                    src: [
                        ".tmp",
                        "build"
                    ]
                }]
            }
        },
        filerev: {
            dist: {
                src: [
                    "dist/client/modules/{,**/}*.js",
                    "dist/client/css/{,**/}*.css",
                    "dist/client/images/{，**/}*.{png,jpg,jpeg,gif,webp,svg}"
                ]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "./",
                    dest: "dist",
                    src: ["client/{,**}/*.*"]
                }, {
                    expand: true,
                    cwd: "./",
                    dest: "dist",
                    src: ["server/{,**}/*.*"]
                }, {
                    expand: true,
                    dot: true,
                    cwd: "./",
                    dest: "dist",
                    src: ["*.{json,sh}"]
                }, {
                    expand: true,
                    dot: true,
                    cwd: "./",
                    dest: "dist",
                    src: ["bower_components/{,**}/*.*"]
                }]
            }
        },
        useminPrepare: {
            html: {
                src: "client/{,**}/*.html"
            },
            options: {
                dest: "dist/client",
                flow: {
                    html: {
                        steps: {
                            js: ["concat", "uglifyjs"],
                            css: ["cssmin"]
                        },
                        post: {
                            js: [{
                                name: 'uglifyjs',
                                createConfig: function (context, block) {
                                    var generated = context.options.generated;
                                    generated.options = {
                                        mangle: false
                                    };
                                }
                            }]
                        }
                    }
                }
            }
        },
        usemin: {
            html: ["dist/client/{,**/}*.html"],
            css: ["dist/client/css/{,**/}*.css"],
            options: {
                assetsDirs: [
                    "dist/client",
                    "dist/client/images",
                    "dist/client/css"
                ]/*,
                blockReplacements: {
                    js: function (block) {
                        return '<script src="' + block.dest + '"></script>';
                    },
                    css: function(block){
                        return '<link rel="stylesheet" href="' + block.dest + '">';
                    }
                }*/
            }
        },
        auto_install: {
            production: {
                options: {
                    cwd: './dist',
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    npm: '--production',
                    bower: false
                }
            }
        },
        war: {
            dist_war: {
                options: {
                    war_dist_folder: ".tmp",
                    war_name: "<%= appName %>"
                },
                files: [
                    {
                        expand: true,
                        cwd: './dist',
                        src: ['**'],
                        dest: ''
                    }
                ]
            }
        },
        compress: {
            dist_tar: {
                options: {
                    archive: "./build/<%= appName %>-" +date +".tar.gz",
                    mode: "tgz"
                },
                files: [
                    {
                        expand: true,
                        cwd: './dist',
                        src: ['**'],
                        dest: ''
                    }
                ]
            }
        }
    });

    grunt.registerTask("package-foton",["clean:dist","less:foton","wiredep","useminPrepare","concat","copy:dist","cssmin","uglify",
        "filerev","usemin","auto_install","compress"]);

    grunt.registerTask("server",["connect:livereload","watch:livereload"]);
}