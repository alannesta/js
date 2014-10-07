var links = [];
var casper = require('casper').create();

casper.start('http://www.sinoquebec.com/bbs/index.php', function() {
	console.log('step1 finish');
    // search for 'casperjs' from google form
    this.fill('#navbar_loginform', {
    	vb_login_username: "alannesta",
    	vb_login_password: "112233"
    }, true);
});


casper.thenOpen("http://www.sinoquebec.com/bbs/newreply.php?p=3435485&noquote=1", function(){
	console.log('step2 finish');
	var token = casper.evaluate(function(){
		return document.querySelector("input[name='securitytoken']").getAttribute("value");
	});
	if (token =="guest"){
		console.log("login failed, please try again");
	}else{
		casper.fill("form[name='vbform']", {
			title: "我问下朋友呢",
			message: "我问下朋友呢"
		}, true)
	}
	
})

casper.thenOpen("http://www.sinoquebec.com/bbs/showthread.php?t=1037992", function(){
	console.log('step3 finish');
	var timestamp = casper.evaluate(function(){
		// return document.querySelector("ol#posts:first-child span.time").outerHTML;
		var nodes = document.querySelectorAll("li[id^='post'] span.time");
		// return nodes[nodes.length-1].getAttribute("id");
		return nodes[nodes.length-1].outerHTML;

	});
	console.log(timestamp);
})




casper.run(function() {
	console.log("done!");
	// this.exit();
});