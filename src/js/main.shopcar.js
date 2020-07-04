require.config({
    paths: {
        jquery: './jquery.min',
        shopcar: './lib/shopcar',
        details: './lib/details',
        index: './lib/index',
        cookie: './cookie'
    }
});

require(['shopcar', 'index'], function(shopcar, index) {
    shopcar.render();
    shopcar.addNum();
    shopcar.redNum();
    shopcar.delPro();
    shopcar.sumPrice();
    shopcar.totalSelect();
    index.cancelTop();
    index.headMove();
    index.personCenter();
})