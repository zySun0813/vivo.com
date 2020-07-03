let baseUrl = "http://localhost/h5-203/vivo.com"; // 基础路径 必须是绝对路径

define(['jquery'], function($) {
    return {
        //页面获取电话号码
        getPhoneNum: function() {
            let phoneNum = location.search.split("=")[1];
            $('.hint1').append(phoneNum);
        },

        //点击获取验证码
        getCode: function() {
            //获取随机数
            function random(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            //获取验证码的点击事件
            $('.get').on('click', function() {
                let code = random(1000, 9999);
                alert(code);
            })
        },

        //点击是否密码可见
        eyeShow: function() {
            $('.eye-box').on('click', function() {
                if ($('.eye-box>img').eq(0).css('display') == 'block') {
                    $('.eye-box>img').eq(0).css('display', 'none');
                    $('.eye-box>img').eq(1).css('display', 'block');

                } else {
                    $('.eye-box>img').eq(0).css('display', 'block');
                    $('.eye-box>img').eq(1).css('display', 'none');

                }
            })
        }


    }
});