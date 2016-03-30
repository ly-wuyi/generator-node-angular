/**
 * Created by ly on 2015/11/11.
 */
;

"use strict";

angular
    .module("<%= appName %>-index")

    .controller("modifyPwdCtrl",["$scope", "$location",function($scope,$location){

    }])

    .controller("indexCtrl",["$scope","$location", function($scope,$location){
        $scope.logout = function(){
            indexService.logout().$promise.then(function(data){
                if(data.status){
                   window.location.replace("/");
                }else{
                    alert(data.errorMessage);
                }
            });
        };
        $scope.backHome = function(){
            if($location.path() != "/welcome"){
                $location.path("/welcome");
            }
        }
        $scope.modifyPwd = function(){
            if($location.path() != "/modifyPwd"){
                $location.path("/modifyPwd");
            }
        }
    }]);