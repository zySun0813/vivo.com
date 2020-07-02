// let baseUrl = "http://localhost/h5-203/vivo.com";

define(['jquery', 'cookie', 'details'], function($, cookie, details) {
    return {
        //渲染购物车
        render: function() {
            let shop = cookie.get('shop'); //   获取cookie数据

            if (shop) {
                shop = JSON.parse(shop);
                let idlist = shop.map(elm => elm.id).join();
                console.log(idlist);
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/shop.php`,
                    data: {
                        idlist: idlist
                    },
                    dataType: "json",
                    success: function(res) {
                        console.log(res);
                        let tempstr = '';

                        res.forEach(elm => {
                            let pic = JSON.parse(elm.pic);
                            let i = 0;

                            // cookie中获取 于当前从数据库中遍历出的相同元素
                            let arr = shop.filter(val => val.id == elm.id);

                            // console.log(arr);

                            tempstr += `
                        <tr class="prod-line tr-border-top">
                            <td class="check-col"><input type="checkbox" class="checkbox"></td>
                            <td class="prod-id" style="display:none">${elm.id}</td>
                            <td class="prod-pic">
                                <a href="#" target="_blank">
                                    <div class="figure"><img src="${baseUrl}/src/${pic[1].src}">

                                    </div>
                                </a>

                            </td>
                            <td class="goods-col">
                                <a href="#" target="_blank" class="goods-link">                                   
                                ${elm.name} ${elm.title}
                                </a><br>颜色：液氧</td>
                            <td class="price-col">${elm.price}</td>
                            <td>
                                <span class="number-box">
                                    <a href="javascript:;" class="reduce-num">-</a>
                                    <input type="number" min="1" title="请输入购买量" max="5" value="${arr[0].num}" readonly="readonly" class="prod-num">
                                    <a href="javascript:;" class="add-num">+</a>
                                </span>
                                <span class="help-line" style="display: none;"></span>
                            </td>
                            <td><span>0.00</span></td>
                            <td class="jifen">${(arr[0].num*elm.price)}</td>
                            <td class="total-price column">${(arr[0].num*elm.price).toFixed(2)}</td>
                            <td><a href="javascript:;" class="favorite">加入到收藏夹</a><br><a href="javascript:;" class="del-pro">删除</a></td>
                        </tr>
                        `;

                        });
                        // console.log(res);
                        if (res.length == 0) {
                            $('.shop-table').html('空空如也！');
                        }
                        $('.shop-table').html(tempstr);
                    }
                });
            }
        },
        //数量增加
        addNum: function() {
            $('.shop-table').on('click', '.add-num', function() {
                let price = $(this).parents('tr').find('.price-col').html();
                let id = $(this).parents('tr').find('.prod-id').html();
                $(this).parents('tr').find('.reduce-num').removeClass('disabled');
                //当购买的数量大于等于5的时候，禁用此按钮
                if ($(this).parents('tr').find('.prod-num').val() >= 5) {
                    $(this).addClass('disabled');
                    return;
                } else {
                    var num = $(this).parents('tr').find('.prod-num').val();
                    num++;
                    //计算小计和积分赠送
                    $(this).parents('tr').find('.prod-num').val(num);
                    $(this).parents('tr').find('.jifen').html(num * price);
                    $(this).parents('tr').find('.total-price').html((num * price).toFixed(2));
                    details.addItem(id, price, num);
                }

                //当购物处于选中状态的时候，同步总计中的价格
                if ($(this).parents('tr').find('.checkbox').prop('checked')) {
                    let sumPrice = $('.zongji').html();
                    let sumNum = $('.red').html();
                    sumPrice = +sumPrice + +price;
                    sumNum = +sumNum + 1;
                    $('.red').html(sumNum);
                    $('.zongji').html(sumPrice);
                }
            })
        },
        //数量减少
        redNum: function() {
            $('.shop-table').on('click', '.reduce-num', function() {
                let price = $(this).parents('tr').find('.price-col').html();
                let id = $(this).parents('tr').find('.prod-id').html();
                $(this).parents('tr').find('.add-num').removeClass('disabled');
                if ($(this).parents('tr').find('.prod-num').val() <= 1) {
                    $(this).addClass('disabled');
                    return;
                } else {
                    var num = $(this).parents('tr').find('.prod-num').val();
                    num--;
                    $(this).parents('tr').find('.prod-num').val(num);
                    $(this).parents('tr').find('.jifen').html(num * price);
                    $(this).parents('tr').find('.total-price').html((num * price).toFixed(2));
                    details.addItem(id, price, num);
                }
                if ($(this).parents('tr').find('.checkbox').prop('checked')) {
                    let sumPrice = $('.zongji').html();
                    let sumNum = $('.red').html();
                    sumPrice = +sumPrice - +price;
                    sumNum = +sumNum - 1;
                    $('.red').html(sumNum);
                    $('.zongji').html(sumPrice);
                }

            })
        },
        //删除商品
        delPro: function() {
            //删除单件产品
            $('.shop-table').on('click', '.del-pro', function() {
                let price = $(this).parents('tr').find('.price-col').html();
                let id = $(this).parents('tr').find('.prod-id').html();
                $(this).parents('tr').remove();
                details.addItem(id, price, 0);

                //删除该商品的时候，如果该商品处于选中状态，应该减去该商品的小计，重新计算该购物车的总价
                if ($(this).parents('tr').find('.checkbox').prop('checked')) {
                    var num = $(this).parents('tr').find('.prod-num').val();
                    let xiaoji = $(this).parents('tr').find('.total-price').html();
                    let sumPrice = $('.zongji').html();
                    let sumNum = $('.red').html();
                    $('.red').html(sumNum - num);
                    $('.zongji').html(sumPrice - xiaoji);
                }
            })

            //删除所有选中的产品
            //思路：1、首先要获取所有选中的商品，遍历得到选中商品的数量和小计，在总计中减去这些数量和小计
            //2、要实现DOM界面的删除、以及cookie中存储数据的删除
            $('.allDelete').on('click', function() {
                var sum = Array.from($('.shop-table .total-price'));
                var num = Array.from($('.shop-table .prod-num'));
                console.log($('.shop-table tr').find('.checkbox'));
                if ($('.shop-table tr').find('.checkbox')) {
                    // let 
                }
            })
        },
        //计算总价
        sumPrice: function() {

            $('.shop-table').on('click', '.checkbox', function() {
                let sum = $('.zongji').html();
                let count = $('.red').html();
                let price = $(this).parents('tr').find('.total-price').html();
                let id = $(this).parents('tr').find('.prod-id').html();
                let num = $(this).parents('tr').find('.prod-num').val();
                //当勾选该商品的时候，计算总价
                if ($(this).prop('checked')) {
                    count = +count + +num;
                    sum = +sum + +price;
                    $('.red').html(count);
                    $('.zongji').html(sum);
                } else {
                    count = +count - +num;
                    sum = +sum - +price;
                    $('.red').html(count);
                    $('.zongji').html(sum);
                }


                //当点击是否选择的时候，如果不选择，就将全选去掉
                if (!$(this).prop('checked')) {
                    // console.log($('.allSelect'));
                    $('.allSelect').prop('checked', false);
                }

                //点击的时候遍历所有表格中的CheckBox，如果全部都被选择了，此时将全选按钮勾选上
                let boxs = Array.from($(this).parents('.shop-table').find('.checkbox'));
                console.log(boxs);
                let res = boxs.every(function(elm) {
                    return $(elm).prop('checked') == true;
                })
                if (res) {
                    $('.allSelect').prop('checked', 'checked');
                }
            })
        },
        //全选功能
        totalSelect: function() {

            $('.allSelect').on('click', function() {
                $('.checkbox').prop('checked', $(this).prop('checked'));

                //全选时候的价格计算
                if (!$(this).prop('checked')) {
                    $('.red').html(0);
                    $('.zongji').html(0);
                } else {
                    var sum = Array.from($('.shop-table .total-price'));
                    var num = Array.from($('.shop-table .prod-num'));
                    var zCount = 0;
                    var zongji = 0;
                    sum.forEach(elm => {
                        zongji = zongji + +$(elm).html();

                    });
                    num.forEach(elm => {
                        zCount = zCount + +$(elm).val();
                    })
                    $('.zongji').html(zongji);
                    $('.red').html(zCount);
                }
            })


        }
    }
});