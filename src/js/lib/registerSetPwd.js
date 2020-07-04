let baseUrl = "http://localhost/h5-203/vivo.com"; // 基础路径 必须是绝对路径
let randCode;

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
                randCode = code;
                alert(code);
            })
        },

        //点击是否密码可见
        eyeShow: function() {
            $('.eye-box').on('click', function() {
                if ($('.eye-box>img').eq(0).css('display') == 'block') {
                    $('.eye-box>img').eq(0).css('display', 'none');
                    $('.eye-box>img').eq(1).css('display', 'block');
                    $('.pwdInput').attr('type', 'text');
                } else {
                    $('.eye-box>img').eq(0).css('display', 'block');
                    $('.eye-box>img').eq(1).css('display', 'none');
                    $('.pwdInput').attr('type', 'password');
                }
            })
        },

        //注册按钮相关功能
        registerBtn: function() {
            $('.input').focus(function() {
                $('.errTip-Box').css('display', 'none');
            });

            $('.os-pc-btn').on('click', function() {
                //首先进行各种表单验证
                if ($('.codeInput').val() == '') {
                    $('.errTip-Box').css('display', 'block');
                    $('.errTip').html('请输入验证码');
                } else {
                    if ($('.pwdInput').val() == '') {
                        $('.errTip-Box').css('display', 'block');
                        $('.errTip').html('请输入密码');
                    } else {
                        if ($('.pwdInput').val().length < 8) {
                            $('.errTip-Box').css('display', 'block');
                            $('.errTip').html('密码不能少于8位');
                        } else {
                            var passwordReg = /[A-z]+/;
                            var passwordReg2 = /\d+/;
                            if (passwordReg.test($('.pwdInput').val()) == false || passwordReg2.test($('.pwdInput').val()) == false) {
                                $('.errTip-Box').css('display', 'block');
                                $('.errTip').html('密码需包含字母和数字');
                            } else {
                                if ($('.codeInput').val() != randCode) {
                                    $('.errTip-Box').css('display', 'block');
                                    $('.errTip').html('验证码错误');
                                } else {
                                    // 验证完成后，访问数据库，进行数据插入
                                    let phone = location.search.split("=")[1];
                                    $.ajax({
                                        type: "get",
                                        url: `${baseUrl}/interface/register.php`,
                                        data: {
                                            'password': $('.pwdInput').val(),
                                            'phone': phone
                                        },
                                        dataType: "json",
                                        success: function(res) {
                                            if (res.has) {
                                                $('.errTip-Box').css('display', 'block');
                                                $('.errTip').html(res.msg);
                                            } else {
                                                if (res.regist) {
                                                    location.href = './login.html';
                                                } else {
                                                    $('.errTip-Box').css('display', 'block');
                                                    $('.errTip').html(res.msg);
                                                }
                                            }

                                        },
                                        error: function(xhr) {
                                            console.log(xhr);
                                        }
                                    });


                                }
                            }
                        }
                    }

                }
            })


        }


    }
});