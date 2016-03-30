/**
 * Created by ly on 2015/11/11.
 */
;

"use strict";

angular
    .module("<%= appName %>-index")

    .service("indexService",["$resource", function($resource){
        return $resource("/api/logout", {}, {
            logout: {method: "POST", responseType: "json"}
        });
    }]);

