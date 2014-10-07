var links = [];
var casper = require('casper').create();
var loginUrl = "http://www.sinoquebec.com/bbs/index.php";
var replyPostUrl = "http://www.sinoquebec.com/bbs/newreply.php?p=3439304&noquote=1";
var postlistUrl = "http://www.sinoquebec.com/bbs/showthread.php?t=1039103"

var msg = casper.cli.args.slice(0,1)[0];

//login
casper.start(loginUrl, function() {
	console.log('step1 finish');
    // search for 'casperjs' from google form
    this.fill('#navbar_loginform', {
    	vb_login_username: "niaoyuetuzi",
    	vb_login_password: "112233"
    }, true);
});

//reply to the post
casper.thenOpen(replyPostUrl, function(){
	
	var token = casper.evaluate(function(){
		return document.querySelector("input[name='securitytoken']").getAttribute("value");
	});
	if (token =="guest"){
		console.log("login failed, please try again");
	}else{
		casper.fill("form[name='vbform']", {
			title: msg,
			message: msg
		}, true)
	}
	console.log('step2 finish');
})

//verify if posting succeeds by checking the last post time
casper.thenOpen(postlistUrl, function(){
	
	var timestamp = casper.evaluate(function(){
		// return document.querySelector("ol#posts:first-child span.time").outerHTML;
		var nodes = document.querySelectorAll("li[id^='post'] span.time");
		// return nodes[nodes.length-1].getAttribute("id");
		return nodes[nodes.length-1].outerHTML+"---- "+nodes[0].outerHTML;;

	});
	console.log(timestamp);
	console.log('step3 finish');
})




casper.run(function() {
	console.log("done!");
	// this.exit();
});