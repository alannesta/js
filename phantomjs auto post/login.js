var page = require('webpage').create(),
    server = 'http://www.sinoquebec.com/bbs/login.php?do=login',
    data = 'vb_login_username=niaoyuetuzi&vb_login_password=&vb_login_password_hint=Password&s=&securitytoken=1412627907-8abd9441ae5cd77c0d24687e82eb75d8832c6289&do=login&vb_login_md5password=d0970714757783e6cf17b26fb8e2298f&vb_login_md5password_utf=d0970714757783e6cf17b26fb8e2298f';

var pageloadCount = 0, loadInProgress = false, currentUrl = server;

http://www.sinoquebec.com/bbs/newreply.php?p=3439042&noquote=1

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
  var reg = /index\.php\?s=/;	//will be redirect to the index page if login succeeds

  //check the url and determine the next step
  if (reg.test(currentUrl)){
  	page.open('http://www.sinoquebec.com/bbs/newreply.php?p=3439042&noquote=1', function(status){
  		// console.log(status);
  		if(status == "success"){
  			// console.log(page.content);
  			var dom = page.evaluate(function(){
  				//all the dom operation should be done within the page.evaluate
  				return document.querySelector("input[name='posthash']").getAttribute('value');
  			});
  			console.log(dom);	//here dom.getAttribute will not work
  		}else{
  			console.log("http://www.sinoquebec.com/bbs/newreply.php?p=3439042&noquote=1");
  			phantom.exit();
  		}
  	});
  }

};

page.onUrlChanged = function(targetUrl) {
  console.log('New URL: ' + targetUrl);
  currentUrl = targetUrl	//store the url and check against them in LoadFinished event
};

page.open(server, 'post', data, function (status) {
    if (status !== 'success') {
        console.log('Unable to login!');
        phantom.exit();
    } else {
     	  
    }
});