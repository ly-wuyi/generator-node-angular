/**
 * Created by ly on 2015/11/9.
 */
;

"use strict";

angular.module("tcommon-tpls",["template/common/navigation.html"]);

angular
    .module("template/common/navigation.html",[])

    .run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/common/navigation.html",
            "<div class='nav-container'><ul id='main-nav' class='nav nav-tabs nav-stacked'>" +
                "<li ng-repeat='menu in menus track by $index' class='panel'>" +
                    "<a ng-if='!menu.children.length' ng-href='{{menu.uri}}'><i class='{{menu.class}}'></i>{{menu.name}}</a>" +
                    "<a data-target='#secondUl{{$index}}' class='nav-header collapsed' data-toggle='collapse' data-parent='#main-nav' ng-if='menu.children.length'>" +
                        //"<i class='glyphicon glyphicon-cog'></i>{{menu.name}}" +
                        "<i class='{{menu.class}}'></i>{{menu.name}}" +
                        "<span class='pull-right glyphicon glyphicon-chevron-down'></span>" +
                    "</a>" +
                    "<ul id='secondUl{{$index}}' class='nav nav-list collapse secondmenu' style='height: 0px;' ng-if='menu.children'>" +
                        "<li ng-repeat='secondMenu in menu.children' active-link>" +
                            "<a ng-href='{{secondMenu.uri}}'><i class=''></i>{{secondMenu.name}}</a>" +
                        "</li>" +
                    "</ul>" +
                "</li>" +
            "</ul></div>"
        );
        $templateCache.put("template/tcommon/commonAlert.html",
            '<div class="modal-header">' +
                '<h3 class="modal-title">{{modal.modalTitle}}</h3>' +
            '</div>' +
            '<div class="modal-body">' +
                '<b>{{ modal.modalContent }}</b>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-primary" ng-if="modal.modalOk" ng-click="ok()">确定</button>' +
                '<button class="btn btn-warning cancel-btn" ng-if="modal.modalCancel" ng-click="cancel()">取消</button>' +
            '</div>'
        );
    }])

    .controller("tcommonModalCtrl",["$scope","$modalInstance","modal",function($scope,$modalInstance,modal){
        $scope.modal = modal;
        $scope.ok = function () {
            $modalInstance.close("ok");
        };
        $scope.cancel = function () {
            $modalInstance.dismiss("cancel");
        };
    }]);