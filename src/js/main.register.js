require.config({
    paths: {
        jquery: './jquery.min',
        register: './lib/register'
    }
});

require(['register'], function(register) {
    register.countryList();
    register.phoneList();
    register.readAgreement();
    register.next();
});