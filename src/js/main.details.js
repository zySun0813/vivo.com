require.config({
    paths: {
        jquery: './jquery.min',
        details: './lib/details',
        cookie: './cookie',
        index: './lib/index'
    },
    shim: {}
});

require(['jquery', 'details', 'index'], function($, details, index) {
    // 回调函数 解决代码执行顺序问题
    // 当页面渲染完成才能获取元素
    details.render(function(id, price) {
        $('.v-btn--dark').on('click', function() {
            details.addItem(id, price, $('.num').val());
            if (confirm('商品已成功加入购物车\n去购物车结算')) {
                location.href = "./shopCar.html";
            }
        })

    });
    details.listMove();
    details.addNum();
    details.redNum();
    details.leftInfoScroll();
    index.cancelTop();
    index.headMove();

});