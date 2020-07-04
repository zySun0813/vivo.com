require.config({
    paths: {
        jquery: './jquery.min',
        index: './lib/index',
        cookie: './cookie'
    },
    shim: {
        md5: ['jquery']
    }
});

require(['index'], function(index) {
    index.render();
    index.headMove();
    index.bannerShow();
    index.cancelTop();
    index.timeDown();
    index.personCenter();
});