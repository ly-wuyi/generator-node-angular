/**
 * Created by ly on 2015/10/14.
 */
;

"uset strict";

angular.module("tcommon")

    .directive("emailValidate",function(){
        //邮箱验证
        var EMAIL_REGEXP = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope,elm,attrs,ctrl){
                ctrl.$parsers.unshift(function(viewValue){
                    if(EMAIL_REGEXP.test(viewValue)){
                        ctrl.$setValidity("emailValidate", true);
                        return viewValue;
                    }else{
                        ctrl.$setValidity("emailValidate",false);
                        return undefined;
                    }
                });
            }
        };
    })

    .directive("mobileValidate",function(){
        //手机号验证
        var MOBILE_REGEXP = /^1\d{10}$/;
        return{
            restrict: "A",
            require: "ngModel",
            link: function(scope,elm,attrs,ctrl){
                ctrl.$parsers.unshift(function(viewValue){
                    if(MOBILE_REGEXP.test(viewValue)){
                        ctrl.$setValidity("mobileValidate",true);
                        return viewValue;
                    }else{
                        ctrl.$setValidity("mobileValidate",false);
                        return undefined;
                    }
                });
            }
        }
    })

    .directive("phoneValidate",function(){
        //座机号验证
        var PHONE_REGEXP = /[0-9-()（）]{7,18}/;
        return{
            restrict: "A",
            require: "ngModel",
            link: function(scope,elm,attrs,ctrl){
                ctrl.$parsers.unshift(function(viewValue){
                    if(PHONE_REGEXP.test(viewValue)){
                        ctrl.$setValidity("phoneValidate",true);
                        return viewValue;
                    }else{
                        ctrl.$setValidity("phoneValidate",false);
                        return undefined;
                    }
                });
            }
        }
    })

    .directive("spaceValidate",function(){
        //空格验证
        var SPACE_REGEXP = /\s+/;
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope,elm,attrs,ctrl){
                ctrl.$parsers.unshift(function(viewValue){
                    if(SPACE_REGEXP.test(viewValue)){
                        ctrl.$setValidity("spaceValidate",false);
                        return undefined;
                    }else{
                        ctrl.$setValidity("spaceValidate",true);
                        return viewValue;
                    }
                });
            }
        }
    });