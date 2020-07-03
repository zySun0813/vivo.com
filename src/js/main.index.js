require.config({
    paths: {
        jquery: './jquery.min',
        index: './lib/index'
    }
});

require(['index'], function(index) {
    index.render();
    index.headMove();
    index.bannerShow();
    index.cancelTop();
    index.timeDown();
});