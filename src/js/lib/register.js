// let baseUrl = "http://localhost/h5-203/vivo.com"; // 基础路径 必须是绝对路径

define(['jquery'], function($) {
    return {

        //国家列表事件
        countryList: function() {

            //下拉列表显示
            $('.show-country').on('click', function() {
                if ($('.arrow>img').eq(0).css('display') == 'block') {
                    $('.arrow>img').eq(0).css('display', 'none');
                    $('.arrow>img').eq(1).css('display', 'block');

                    //展示下拉菜单
                    $('.country-list-box').css('display', 'block');
                } else {
                    $('.arrow>img').eq(0).css('display', 'block');
                    $('.arrow>img').eq(1).css('display', 'none');

                    //收起下拉菜单
                    $('.country-list-box').css('display', 'none');
                }
            })

            //选择国家
            $('.country-list').on('click', '.country-item', function() {
                $('.show-country i').html($(this).html());
            })
        },

        //电话号码区号
        phoneList: function() {
            $('.show-code').on('click', function() {
                if ($('.code-list-box').css('display') == 'none') {
                    $('.code-list-box').css('display', 'block');
                } else {
                    $('.code-list-box').css('display', 'none');
                }
            });
            //选择区号
            $('.code-list').on('click', '.code-item', function() {
                $('.show-code').html($(this).find('div').eq(1).html());
            })
        },

        //是否阅读并接受协议
        readAgreement: function() {
            $('.check-box').on('click', function() {
                if ($('.check-box img').css('display') == 'none') {
                    $('.check-box img').css('display', 'block');
                    $('.errTip-Box').css('display', 'none');
                } else {
                    $('.check-box img').css('display', 'none');

                }
            })
        },

        //下一步按钮相关功能
        next: function() {
            $('.input').focus(function() {
                $('.errTip-Box').css('display', 'none');
            });
            $('.os-pc-btn').on('click', function() {
                if ($('.input').val() == '') {
                    $('.errTip-Box').css('display', 'block');
                    $('.errTip').html('请输入手机号');
                } else {
                    var phoneReg = /^1[35789]\d{9}$/;
                    if (phoneReg.test($('.input').val()) == false) {
                        $('.errTip-Box').css('display', 'block');
                        $('.errTip').html('请输入有效的手机号');
                    } else {
                        if ($('.check-box img').css('display') == 'none') {
                            $('.errTip-Box').css('display', 'block');
                            $('.errTip').html('请您先勾选接受《vivo服务协议》');
                        } else {
                            location.href = "./registerSetPwd.html?phoneNum=" + $('.input').val();
                        }
                    }

                }
            })
        }
    }
});