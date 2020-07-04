require.config({
    paths: {
        jquery: './jquery.min',
        registerSetPwd: './lib/registerSetPwd'
    }
});

require(['registerSetPwd'], function(registerSetPwd) {
    registerSetPwd.getPhoneNum();
    registerSetPwd.getCode();
    registerSetPwd.eyeShow();
    registerSetPwd.registerBtn();
});