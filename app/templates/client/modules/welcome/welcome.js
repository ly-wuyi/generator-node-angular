/**
 * Created by ly on 2016/1/25.
 */
;
"use strict";

angular
    .module("<%= appName %>-welcome", ["ngResource"])

    .config(["$routeProvider", function($routeProvider){
        $routeProvider
            .when("/welcome", {
                templateUrl: "modules/welcome/welcome.html",
                controller: "welcomeCtrl"
            });
    }]);