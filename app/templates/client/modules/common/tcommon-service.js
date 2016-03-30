/**
 * Created by yong.liu on 2015/9/20.
 */
;

"use strict";

angular.module("tcommon")

    .factory("serverAdminService",["$resource",function($resource){
        return $resource("/api/resourceServer/getResourceListByRootURI",{},{query: {method: "POST"}});
    }]);