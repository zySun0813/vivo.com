let baseUrl = "http://localhost/h5-203/vivo.com";
let price = 0;

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback) {
            let id = location.search.split("=")[1];

            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getItem.php`,
                data: {
                    id: id
                },
                dataType: "json",
                success: function(res) {
                    console.log(res);
                    let pic = JSON.parse(res.pic);

                    let bigPic = `<img src="${baseUrl}/src/${pic[0].src}" alt="">`;
                    let imgLists = `
                    <li><img src="${baseUrl}/src/${pic[1].src}" alt=""></li>
                    <li><img src="${baseUrl}/src/${pic[2].src}" alt=""></li>
                    <li><img src="${baseUrl}/src/${pic[3].src}" alt=""></li>
                    <li><img src="${baseUrl}/src/${pic[4].src}" alt=""></li>                    
                    `;
                    let salePrice = res.price;
                    price = salePrice;
                    let title = res.name + res.title;

                    let detailsInfo = `
                    <img src="${baseUrl}/src/${(JSON.parse(res.details).info)[0]}" alt="">
                    <img src="${baseUrl}/src/${(JSON.parse(res.details).info)[1]}" alt="">
                    `;

                    $('.bigPic').html(bigPic);
                    $('.imgLists').html(imgLists);
                    $('.name').html(title);
                    $('.info_content').html(detailsInfo);
                    $('.sale-price').append(salePrice);

                    callback && callback(res.id, res.price);
                }
            });
        },
        addItem: function(id, price, num) {
            // shop
            let shop = cookie.get('shop'); // 获取cookie中的购物车 
            // 获取是为了判断它是否存在
            // 不存在 创建
            // 存在 修改

            let product = {
                id: id,
                price: price,
                num: num
            }

            if (shop) { // 存在
                shop = JSON.parse(shop); // 将字符串转成数组
                // 数组中已经存在了商品的id
                // 只修改num值 而不是将商品放入数组
                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = num : null;
                    });
                } else {
                    shop.push(product);
                }

            } else {
                shop = []; // 不存在新建数组
                shop.push(product); // 放入商品
            }
            // console.log(num);
            // if (num == 0) {
            //     // console.log(num);
            //     shop.pop(product);
            // }
            // let flag = -1;
            // shop.forEach(function(elm, i) {
            //     if (elm.id == id) {
            //         flag = i;
            //     }
            // });
            shop = shop.filter(function(elm) {
                return elm.num != 0;
            })
            cookie.set('shop', JSON.stringify(shop), 1);
        },
        listMove: function() {
            $('.imgLists').on('mouseenter', 'li', function() {
                let index = $(this).index();
                let smallStr = $(this).find('img').attr('src').slice(0, -16);
                $('.bigPic img').attr('src', smallStr + '750x750.png.webp');
            })
        },
        addNum: function() {
            $('.num_add').on('click', function() {
                //一旦能加了，减号立即就可以使用了
                $('.num_reduce').removeClass('disabled');
                if ($('.num').val() == 5) {
                    $('.num_add').addClass('disabled');
                } else {
                    $('.num_add').removeClass('disabled');
                    var num = $('.num').val();
                    num++;
                    //当加到5的时候立即就不能用了
                    if (num == 5) {
                        $('.num_add').addClass('disabled');
                    }
                    $('.num').val(num);
                    $('.select_num').html(num);
                    var sum = price * num;
                    $('.sum-price').html(sum);
                }
            })
        },
        redNum: function() {
            $('.num_reduce').on('click', function() {
                //一旦能减了，加号就立即可以使用了
                $('.num_add').removeClass('disabled');
                if ($('.num').val() == 1) {
                    $('.num_reduce').addClass('disabled');
                } else {
                    $('.num_reduce').removeClass('disabled');
                    var num = $('.num').val();

                    num--;
                    //当减到0的时候立即就不能用了
                    if (num == 1) {
                        $('.num_reduce').addClass('disabled');
                    }
                    $('.num').val(num);
                    $('.select_num').html(num);
                    var sum = price * num;
                    $('.sum-price').html(sum);
                }

            })


        }
    }
});