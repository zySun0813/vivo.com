require.config({
    paths: {
        jquery: './jquery.min',
        registerSetPwd: './lib/registerSetPwd',
        md5: './md5'
    },
    shim: {
        md5: ['jquery']
    }
});

require(['registerSetPwd'], function(registerSetPwd) {
    registerSetPwd.getPhoneNum();
    registerSetPwd.getCode();
    registerSetPwd.eyeShow();
    registerSetPwd.registerBtn();
});