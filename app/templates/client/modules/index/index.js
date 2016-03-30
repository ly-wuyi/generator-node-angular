/**
 * Created by ly on 2015/11/11.
 */
;

"use strict";

angular
    .module("<%= appName %>-index",[
        "ngResource"
    ])

    .config(["$routeProvider", function($routeProvider){
        $routeProvider
            .when("/modifyPwd", {
                templateUrl: "modules/index/modifyPwd.html",
                controller: "modifyPwdCtrl"
            });
    }])

    .run(["$rootScope","indexMenuService", function($rootScope,indexMenuService){
        indexMenuService.query().$promise.then(function(data){
            if(data.status == "SUCCEED"){
                $rootScope.menus = data.menus;
            }
        });
    }]);
