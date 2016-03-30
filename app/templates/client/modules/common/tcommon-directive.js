/**
 * Created by ly on 2015/10/14.
 */
;

"uset strict";

angular.module("tcommon")

    .directive("paginator",function($parse){
        return {
            restrict : "A",
            replace : true,
            template : function(element,attr){
                var parseExpress = attr["paginator"],
                    preExpress = parseExpress + ".current",
                    nextExpress = parseExpress + ".hasNext",
                    html = "<div class=\"bw-fcommon-paginator\"><ul><li class=\"bw-pre\" ng-if=\"1 !== " + preExpress + "\">上一页</li><li class=\"bw-next\" ng-if=\"" + nextExpress + "\">下一页</li></ul></div>";
                return html;
            },
            link : function($scope,$element,$attrs){
                var bindExpress = $attrs["paginator"],
                    parseFun = $parse(bindExpress);
                    tmpModel = parseFun($scope);
                (function(model){
                    $element.on("click",".bw-pre",function(){
                        $scope.$apply(model.onPreClicked);
                    }).on("click",".bw-next",function(){
                        $scope.$apply(model.onNextClicked);
                    });
                })(tmpModel);
            }
        };
    })

    .directive("navigationMenu", function(){
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            scope: {
                menus: "=menuData"
            },
            link: function(scope, element, attrs, controllers) {
                
            },
            templateUrl: "template/common/navigation.html"
        }
    })

    .directive('kindeditor', function () {
        var linkFn = function (scope, elm, attr, ctrl) {
            if (typeof KindEditor === 'undefined') {
                return;
            }
            var _config = {
                width: '100%',
                autoHeightMode: false,
                afterCreate: function () {
                    this.loadPlugin('autoheight');
                }
            };
            var editorId = elm[0],
                editorConfig = scope.config || _config;
            editorConfig.afterChange = function () {
                if (!scope.$$phase) {
                    ctrl.$setViewValue(this.html());
                    // exception happens here when angular is 1.2.28
                    // scope.$apply();
                }
            };
            if (KindEditor) {
                KindEditor.create(editorId, editorConfig);
            }
            ctrl.$parsers.push(function (viewValue) {
                ctrl.$setValidity('keditor', viewValue);
                return viewValue;
            });
        };
        return {
            restrict: "C",
            require: 'ngModel',
            scope: { config: '=config' },
            link: linkFn
        };
    })

    .directive("activeLink", ["$location", function (location) {
        return {
            restrict: "A",
            link: function (scope, element) {
                element.on("click", function () {
                    $("#main-nav").find('.secondmenu').children().removeClass('active');
                    element.addClass('active');
                    setTimeout(function () {
                        if(element.attr('data-navHerf')){
                            $('a[href="'+ element.attr('data-navHerf') + '"').parent().addClass('active')
                        }
                    },100)
                })
            }
        }
    }])

    .directive("treeSelect", [function () {
        return {
            restrict: "A",
            link: function (scope, element) {
                element.on("click",function(){
                    $(".ttree").find('.leaf-label').removeClass('active');
                    element.addClass('active');
                });
            }
        }
    }])

    .directive("serverAdmin",["$rootScope",function($rootScope){
        return {
            restrict: "A",
            priority: 0,
            scope: {
                uri: "@uri"
            },
            link: function(scope, iElement, iAttrs, controller, transcludeFn){
                if(scope.authorized){
                    iElement.show();
                }else{
                    iElement.hide();
                }
            },
            controller: function($scope){
                var authority = $rootScope.authority;
                if(authority){
                    angular.forEach(authority,function(item){
                        if(item.uri == $scope.uri){
                            $scope.authorized = true;
                        }
                    });
                }else{
                    $scope.authorized = false;
                }
            }
        }
    }])

    .directive('iePlaceholder', function(){
        return {
            restrict: 'C',
            require: 'ngModel',
            link: function(scope, element, attrs) {
                setTimeout(function(){
                    insert();
                },1000);
                var insert = function() {
                    element.val(attrs.placeholder);
                };
                element.on('blur', function(){
                    if(element.val() == '' || element.val() == null)
                        insert();
                });

                element.on('focus', function(){
                    if(element.val() == attrs.placehold || element.val() == null)
                        element.val('');
                });

                if(element.val() === '' || element.val() == null)
                    insert();
            }
        }
    })
;