var $;
layui.use(['jquery','layer','form'], function () {
    $ = layui.jquery;
    layui.form.verify({
        loginName: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_]+$").test(value))
                return '登录名不能有中文或者特殊字符';
            if(/(^\_)|(\__)|(\_+$)/.test(value))
                return '登录名首尾不能出现下划线\'_\'';
        }
        ,password: [
            /^[\S]{6,20}$/
            ,'密码必须6到12位，且不能出现空格'
        ]
        ,captcha: [
            /^[\S]{4,5}$/
            ,'验证码必须4位，且不能出现空格'
        ]
    });

    layui.form.on('submit(login)', function (data) {
        layer.load(1);
        $.post("loginAuth",data.field,function(data) {
            layer.closeAll('loading');
            layer.msg(data.msg);
            if(data.code=="0")
             location.replace("main");
            else
             $('#captchaImg').click();
        },'json');

        return false;
    });
    layui.form.render();

    $("input[name='captcha']").on('keypress',function(event){
        if(event.keyCode == 13)
            $('#loginButton').click();
    });

    $("#captchaImg").hover(function(){
        layer.tips("点击可刷新",this);
    },function(){
        layer.closeAll('tips');
    });

    $('#captchaImg').on('click',function(event){
        $(this).attr("src", "captcha?" + Math.floor(Math.random() * 100)).fadeIn();
    });



});

