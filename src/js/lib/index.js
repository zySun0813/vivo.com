let baseUrl = "http://localhost/h5-203/vivo.com"; // 基础路径 必须是绝对路径

define(['jquery'], function($) {
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
        bannerShow: function banner() {
            //鼠标点击小按钮进行切图
            $('.thumb-list>li').click(function() {
                $('.thumb-list>li').removeClass('active');
                $(this).addClass('active');
                // console.log($(this).index());
                $('.img-list').css('left', -1600 * $(this).index());
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
                $('.img-list').css('left', -1600 * bannerIndex);

            }, 1000);

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
                    $('.img-list').css('left', -1600 * bannerIndex);

                }, 3000);
            });
        }
    }
});