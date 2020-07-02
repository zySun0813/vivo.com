require.config({
    paths: {
        jquery: './jquery.min',
        shopcar: './lib/shopcar',
        details: './lib/details',
        cookie: './cookie'
    }
});

require(['shopcar'], function(shopcar) {
    shopcar.render();
    shopcar.addNum();
    shopcar.redNum();
    shopcar.delPro();
    shopcar.sumPrice();
    shopcar.totalSelect();
})