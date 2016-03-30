/**
 * Created by ly on 2016/3/30.
 */
;

"use strict";

angular
    .module("<%= appName %>",[
        "ngRoute",
        "ngAnimate",
        "ngCookies",
        "angular-loading-bar",
        "tcommon",
        "<%= appName %>-welcome",
        "<%= appName %>-index"
    ])

    .config(["$httpProvider","$routeProvider","$locationProvider","cfpLoadingBarProvider",
        function ($httpProvider, $routeProvider, $locationProvider, cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.latencyThreshold = 500;//ms
            $locationProvider.html5Mode(false);
            $routeProvider
                .otherwise({
                    redirectTo: "/welcome"
                });
            $httpProvider.interceptors.push("httpInterceptorService");
        }
    ])

    .factory("httpInterceptorService",["$rootScope","$q","$timeout","$window",function($rootScope,$q,$timeout,$window){
        return {
            'request': function(config) {
                if(!config.ignoreLoading){
                    $rootScope.loadingShow = true;
                }
                return config;
            },
            'requestError': function(rejection) {
                $rootScope.loadingShow = false;
                return $q.reject(rejection);
            },
            'response': function(response) {
                if(response.headers("api")){
                    $window.location.reload();
                }else{
                    if(response.data.status == "SUCCEED" || response.config.url.indexOf(".html") != -1){
                        $rootScope.loadingShow = false;
                    }else if(response.data.status == "FAILED"){
                        //提示
                        $rootScope.loadingShow = false;
                    }else{
                        $timeout(function(){
                            $rootScope.loadingShow = false;
                        }, 500);
                    }
                    return response;
                }
            },
            'responseError': function(rejection) {
                $rootScope.loadingShow = false;
                return $q.reject(rejection);
            }
        };
    }]);