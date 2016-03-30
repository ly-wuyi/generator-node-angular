/**
 * Created by yong.liu on 2015/9/19.
 */
;
"use strict";
if("undefined" == jQuery){
    throw new Error("requires jQuery!");
}
+function($,w){
    $.extend({
        asyncAjax: asyncAjax
    });

    /**
     * 异步ajax
     */
    function asyncAjax(args){
        var configs = {
            method: "GET",
            url: "",
            data:"",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            beforeSend: function(xhr){}
        };
        var params = $.extend(true,{},configs,args);
        var deferred = $.ajax({
            method: params.method,
            url: params.url,
            data: params.data,
            contentType: params.contentType,
            dataType: params.dataType,
            beforeSend: params.beforeSend
        });
        return deferred;
    }


}(jQuery,window);