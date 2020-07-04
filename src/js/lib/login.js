// let baseUrl = "http://localhost/h5-203/vivo.com"; // 基础路径 必须是绝对路径

define(['jquery', 'md5', 'cookie'], function($, md5, cookie) {
    return {
        //点击切换登录方式
        loginStyle: function() {
            //账号登录与短信验证码登录切换效果
            $('.toggle-module').on('click', function() {
                let temp = $('.toggle-module span').html();
                $('.toggle-module span').html($('.tilte').html());
                $('.tilte').html(temp);
                if ($('.tilte').html().trim() == '帐号登录') {
                    $('.pwd-box').css('display', 'block');
                    $('.check-box').css('display', 'block');

                    $('.code-box').css('display', 'none');
                    $('.hint3').css('display', 'none');
                } else {
                    $('.pwd-box').css('display', 'none');
                    $('.check-box').css('display', 'none');
                    $('.code-box').css('display', 'block');
                    $('.hint3').css('display', 'block');
                }
            })
        },

        //电话号码区号
        phoneList: function() {
            $('.code-item').on('click', function() {
                if ($('.country-list-box').css('display') == 'none') {
                    $('.country-list-box').css('display', 'block');
                } else {
                    $('.country-list-box').css('display', 'none');
                }
            });
            //选择区号
            $('.country-list').on('click', '.country-item', function() {
                $('.code-item').html($(this).find('span').eq(1).html());
            })
        },

        //两周内自动登录
        autoLogin: function() {
            $('.auto-login').on('click', function() {
                if ($('.auto-login img').css('display') == 'none') {
                    $('.auto-login img').css('display', 'block');
                    $('.errTip-Box').css('display', 'none');
                } else {
                    $('.auto-login img').css('display', 'none');

                }
            })
        },

        //登录功能
        loginBtn: function() {
            $('.input').focus(function() {
                $('.errTip-Box').css('display', 'none');
            });

            //首先进行相关的表单验证
            $('.os-pc-btn').on('click', function() {
                //首先进行各种表单验证
                if ($('.phoneInput').val() == '') {
                    $('.errTip-Box').css('display', 'block');
                    $('.errTip').html('请输入手机号');
                } else {
                    if ($('.pwdInput').val() == '') {
                        $('.errTip-Box').css('display', 'block');
                        $('.errTip').html('请输入密码');
                    } else {

                        //验证完成后进行登录操作
                        $.ajax({
                            type: "get",
                            url: `${baseUrl}/interface/login.php`,
                            data: {
                                'password': $.md5($('.pwdInput').val()),
                                'phone': $('.phoneInput').val()
                            },
                            dataType: "json",
                            success: function(res) {
                                if (res.login) {
                                    cookie.set('phone', $('.phoneInput').val());
                                    location.href = './index.html';
                                } else {
                                    $('.errTip-Box').css('display', 'block');
                                    $('.errTip').html(res.msg);
                                }
                            },
                            error: function(xhr) {
                                console.log(xhr);
                            }
                        });

                    }
                }
            })
        },

        //去注册
        toRegist: function() {
            $('.register-button').on('click', function() {
                location.href = './register.html';
            })
        }
    }
});