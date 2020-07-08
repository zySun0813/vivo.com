let baseUrl = "http://localhost/h5-203/vivo.com"; // 基础路径 必须是绝对路径

define(['jquery', 'cookie'], function($, cookie) {
    return {
        //渲染首页
        render: function() {
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getall.php`,
                dataType: "json",
                success: function(res) {
                    console.log(res);
                    let temp = '';
                    res.forEach(elm => {
                        // console.log(elm.pic);
                        let pic = JSON.parse(elm.pic);
                        console.log(pic);
                        temp += `<li class="box ">
                        <a target="_blank " href="${baseUrl}/src/html/details.html?id=${elm.id}">
                            <img src="${baseUrl}/src/${pic[0].src}" style="display: inline; ">
                        </a>
                        <div class="color-wrapper ">
                            <p class="name ">
                            ${elm.name}
                            </p>
                        </div>
                        <div class="prodinfo ">
                            <p class="name ">
                            ${elm.name}
                            </p>
                            <p class="feature "> ${elm.title}</p>
                            <p class="price rmb-symbol ">${elm.price}</p>
                        </div>
                    </li>`;
                    });

                    $('.c_3>.box-list').html(temp);
                }
            });
        },

        //网页导航栏悬浮效果
        headMove: function() {
            //鼠标移入导航栏，设置高度位324
            $('.vp-head-series').on('mouseenter', function() {
                    $('.vp-head-menu-series').css('height', '324px');
                })
                //鼠标移出模块，设置高度为0
            $('.vp-head-menu-series').on('mouseleave', function() {
                $(this).css('height', '0px');
            })
        },

        //轮播图效果
        bannerShow: function() {
            //鼠标点击小按钮进行切图
            $('.thumb-list>li').click(function() {
                $('.thumb-list>li').removeClass('active');
                $(this).addClass('active');
                // console.log($(this).index());
                $('.img-list').css('left', -2134 * $(this).index());
            });
            var bannerIndex = 0;
            //自动轮播
            timer = setInterval(function() {
                bannerIndex++;
                if (bannerIndex >= 5) {
                    bannerIndex = 0;
                }
                $('.thumb-list>li').removeClass('active');
                $('.thumb-list>li').eq(bannerIndex).addClass('active');
                $('.thumb-list>li>i').eq(bannerIndex).addClass('active2');
                $('.img-list').css('left', -2134 * bannerIndex);

            }, 3000);

            //鼠标移入停止轮播
            $('.banner').mouseenter(function() {
                clearInterval(timer);
            });
            //鼠标移出继续轮播
            $('.banner').mouseleave(function() {
                timer = setInterval(function() {
                    bannerIndex++;
                    if (bannerIndex >= 5) {
                        bannerIndex = 0;
                    }
                    $('.thumb-list>li').removeClass('active');
                    $('.thumb-list>li').eq(bannerIndex).addClass('active');
                    $('.img-list').css('left', -2134 * bannerIndex);

                }, 3000);
            });
        },

        //返回顶部效果
        cancelTop: function() {
            $(window).on('scroll', function() {
                let top = $(this).scrollTop();
                if (top >= 700) {
                    $('.icon-fanhuidingbu').css('display', 'block');
                } else {
                    $('.icon-fanhuidingbu').css('display', 'none');
                }
            })
            $('.icon-fanhuidingbu').on('click', function() {
                $('html,body').animate({
                    scrollTop: 0
                }, 600);
            })
        },

        //抢购模块
        timeDown: function() {
            //抢购倒计时
            setInterval(function() {
                var d = new Date();
                var d2 = new Date(2020, 7, 16, 18, 0, 0);
                var num = d2 - d; //这是两个天数之间的毫秒差
                var secondNum = num / 1000; //将毫秒转化成秒
                var day = parseInt(secondNum / 86400); //剩余天数
                var hour = parseInt(secondNum % 86400 / 3600); //再将剩余的秒转换成小时
                var minute = parseInt(secondNum % 86400 % 3600 / 60); //再将剩余的秒转换成分钟
                var second = parseInt(secondNum % 86400 % 3600 % 60); //最后拿到剩余的秒

                $('.hour').html(hour);
                $('.min').html(minute);
                $('.sec').html(second);
            }, 1000);

            //前进、后退按钮功能
            //前进按钮
            $('.J_swiper-prev').on('click', function() {
                let left = $('.swiper-wrapper').css('left').slice(0, -2);
                if (left == 0) {
                    $('.swiper-wrapper').css('left', 0);
                } else {
                    left = +left + 302.5;
                    console.log(left);
                    $('.swiper-wrapper').css('left', left);
                }
            })

            //后退按钮
            $('.J_swiper-next').on('click', function() {
                let left = $('.swiper-wrapper').css('left').slice(0, -2);
                if (left == -605) {
                    $('.swiper-wrapper').css('left', -605);
                } else {
                    left = +left - 302.5;
                    console.log(left);
                    $('.swiper-wrapper').css('left', left);
                }

            })
        },

        //隐藏登录注册，显示个人中心
        personCenter: function() {
            let phone = cookie.get('phone');
            if (phone) {
                $('.vp-user-login-box').css('display', 'none');
                $('.vp-head-top-user').append('<a class="personCenter">个人中心</a>');

                $('.vp-head-top-user').on('mouseenter', '.personCenter', function() {
                    $('.alreadyLogin').css('display', 'block');
                    $('.alreadyLogin').css('height', '150px');
                });
                $('.alreadyLogin').on('mouseleave', function() {
                    $(this).css('display', 'none');
                    $('.alreadyLogin').css('height', '0px');
                });

            } else {
                $('.vp-user-login-box').css('display', 'block');
            }
        },

        //购物车数量
        shopNums: function() {
            let count = 0;
            let shop = cookie.get('shop'); //   获取cookie数据
            shop = JSON.parse(shop);
            shop.forEach(function(elm) {
                count += +elm.num;
            });
            if (count != 0) {
                $('.prodnum').html(count);
                $('.shopNums').html(`(${count})`);
            }
        }
    }
});