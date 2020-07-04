require.config({
    paths: {
        jquery: './jquery.min',
        login: './lib/login',
        registerSetPwd: './lib/registerSetPwd',
        register: './lib/register',
        cookie: './cookie',
        md5: './md5'
    },
    shim: {
        md5: ['jquery']
    }
});

require(['login', 'registerSetPwd', 'register'], function(login, registerSetPwd, register) {
    login.loginStyle();
    login.phoneList();
    login.autoLogin();
    login.loginBtn();
    login.toRegist();
    registerSetPwd.eyeShow();
    // register.phoneList();
});