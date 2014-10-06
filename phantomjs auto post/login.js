var page = require('webpage').create(),
    server = 'http://www.sinoquebec.com/bbs/login.php?do=login',
    data = 'vb_login_username=niaoyuetuzi&vb_login_password=&vb_login_password_hint=Password&s=&securitytoken=1412627907-8abd9441ae5cd77c0d24687e82eb75d8832c6289&do=login&vb_login_md5password=d0970714757783e6cf17b26fb8e2298f&vb_login_md5password_utf=d0970714757783e6cf17b26fb8e2298f';

page.open(server, 'post', data, function (status) {
    if (status !== 'success') {
        console.log('Unable to post!');
    } else {
        console.log(page.content);
    }
    phantom.exit();
});