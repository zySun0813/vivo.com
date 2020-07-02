require.config({
    paths: {
        jquery: './jquery.min',
        details: './lib/details',
        cookie: './cookie'
    },
    shim: {}
});

require(['jquery', 'details'], function($, details) {
    // 回调函数 解决代码执行顺序问题
    // 当页面渲染完成才能获取元素
    details.render(function(id, price) {
        $('.v-btn--dark').on('click', function() {
            details.addItem(id, price, $('.num').val());

        })

    });
    details.listMove();
    details.addNum();
    details.redNum();
});