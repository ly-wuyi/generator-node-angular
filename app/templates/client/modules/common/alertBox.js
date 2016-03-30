/**
 * Created by Ramosy on 2015/10/28.
 * 这是一个弹出框插件
 *
 *
 * 使用方法
 *
 * 模拟alert的调用：$.MessageBox.Alert(title,msg)
 * @param title string  '标题'
 * @param msg string    '内容'
 *
 * 模拟Confirm的调用：$.MessageBox.Confirm(title, msg,okCallBack,falseCallBack,leftWord,rightWord)
 * @param title string  '标题'
 * @param msg string    '内容'
 * @param okCallBack function    '点击确认，回调函数'
 * @param falseCallBack function    '点击取消，回调函数'
 * @param leftWord string    '左边按钮名字，默认是确定'
 * @param rightWord string    '右边按钮名字，默认是取消'
 *
 */
(function () {

    //初始化弹出框对象
    $.MessageBox = {
        Alert: function (title, msg) {
            GenerateHtml("alert", title, msg);
            btnOk();
            btnNo();
        },
        Confirm: function (title, msg,okCallBack,falseCallBack,leftWord,rightWord) {
            var flag = '';
            GenerateHtml("confirm", title, msg,leftWord,rightWord);
            btnOk(okCallBack);
            btnNo(falseCallBack);
        }
    };

    //生成Html
    var GenerateHtml = function (type, title, msg,leftWord,rightWord) {

        var _html = "";

        _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title + '</span>';
        _html += '<a id="mb_ico" class="glyphicon glyphicon-remove"></a><div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';

        if (type == "alert") {
            _html += '<input id="mb_btn_ok" type="button" value="确定" />';
        }
        if (type == "confirm") {
            if(leftWord){
                _html += '<input id="mb_btn_ok" type="button" value="'+leftWord+'" />';
            }else{
                _html += '<input id="mb_btn_ok" type="button" value="确定" />';
            }
            if(rightWord){
                _html += '<input id="mb_btn_no" type="button" value="'+rightWord+'" />';
            }else{
                _html += '<input id="mb_btn_no" type="button" value="取消" />';
            }

        }
        _html += '</div></div>';

        //必须先将_html添加到body，再设置Css样式
        $("body").append(_html); GenerateCss();
    };

    //生成Css
    var GenerateCss = function () {

        $("#mb_box").css({ width: '100%', height: '100%', zIndex: '99999', position: 'fixed',
            filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6'
        });

        $("#mb_con").css({ zIndex: '999999', width: '400px', position: 'fixed',
            backgroundColor: 'White', borderRadius: '5px'
        });

        $("#mb_tit").css({ display: 'block', fontSize: '14px', color: '#444', padding: '10px 15px',
            backgroundColor: '#DDD', borderRadius: '5px 5px 0 0',
            borderBottom: '3px solid #009BFE', fontWeight: 'bold'
        });

        $("#mb_msg").css({ padding: '20px', lineHeight: '20px',
            borderBottom: '1px dashed #DDD', fontSize: '13px',textAlign:'center'
        });

        $("#mb_ico").css({ display: 'block', position: 'absolute', right: '10px', top: '9px'});

        $("#mb_btnbox").css({ margin: '15px 0 10px 0', textAlign: 'center' });
        $("#mb_btn_ok,#mb_btn_no").css({ width: '85px', height: '30px', color: 'white', border: 'none' });
        $("#mb_btn_ok").css({ backgroundColor: '#168bbb' });
        $("#mb_btn_no").css({ backgroundColor: 'gray', marginLeft: '20px' });


        //右上角关闭按钮hover样式
        $("#mb_ico").hover(function () {
            $(this).css({ backgroundColor: 'Red', color: 'White',cursor:'pointer' });
        }, function () {
            $(this).css({ backgroundColor: '#DDD', color: 'black',cursor:'pointer'  });
        });

        var _widht = document.documentElement.clientWidth;  //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高

        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();

        //让提示框居中
        $("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });
    };

    //确定按钮事件
    var btnOk = function (okCallBack) {
        $("#mb_btn_ok").click(function () {
            $("#mb_box,#mb_con").remove();
            if (typeof (okCallBack) == 'function') {
                okCallBack();
            }
        });
    };

    //取消按钮事件
    var btnNo = function (falseCallBack) {
        $("#mb_btn_no,#mb_ico").click(function () {
            $("#mb_box,#mb_con").remove();
            if (typeof (falseCallBack) == 'function') {
                falseCallBack();
            }
        });
    };
})();