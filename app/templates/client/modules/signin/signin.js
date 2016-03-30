/**
 * Created by yong.liu on 2015/9/19.
 */
;
"use strict";
$(function(){
    $("#resetBtn").click(function(){
        $("#signinForm")[0].reset();
    });
   var val= function(){
        var userName = $("#userName").val();
        var password = $("#password").val();
        var data = {userName: userName, password: password};
        $.asyncAjax({url:"api/signin",method:"POST", data: data}).then(function(result){
                if(result.status=="FAILED"){
                    alert("登录失败!");
                }
                if(result.status==true){
                    window.location.href = "/";
                }

        },function(e){
            alert("系统错误");
            return
        });
    };
    document.onkeydown=function(event){
        var e = event || window.event;
        if(e && e.keyCode==13){
            val();
        }
    };
    $("#submitBtn").click(function(){
       val();
    });
});
