var page = require('webpage').create();

var loadInProgress;

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
};

page.open('http://www.sinoquebec.com/bbs/index.php', function (status) {
	if (status === 'fail') {
		console.log();
	} else {
		// console.log(page.content);
		var content = page.content;
		// console.log(content);
		page.evaluate(function () {
           var username = document.querySelector('#navbar_username');
           username.value = "alannesta";
           var password = document.querySelector('#navbar_password');
           password.value = "112233";
           var form = document.querySelector('#navbar_loginform');
           form.submit();
        });

		// console.log(document.querySelector('#navbar_username'));
		// console.log(data);
	}	
	// page.close();
	// phantom.exit();
});
setTimeout(function(){
	// console.log(page.content);
	page.evaluate(function(){
		console.log('result: ');
		console.log(document.querySelector('.welcomelink').outerHTML);
	})
}, 10000);