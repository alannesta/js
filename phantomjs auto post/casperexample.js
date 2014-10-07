var links = [];
var casper = require('casper').create();

//sinoquebec params
var loginUrl = "http://www.sinoquebec.com/bbs/index.php";
var replyPostUrl = "http://www.sinoquebec.com/bbs/newreply.php?p=3439304&noquote=1";
var postVerifyUrl = "http://www.sinoquebec.com/bbs/showthread.php?t=1039103"

//iask.ca params
var iaskLogin = "http://forum.iask.ca/login";
var iaskPostUrl = "http://forum.iask.ca/threads/%E4%B8%93%E4%B8%9A%E5%AE%9D%E5%AE%9D%E6%91%84%E5%BD%B1%E5%B7%A5%E4%BD%9C%E5%AE%A4%EF%BC%8C%E6%89%93%E9%80%A0%E5%B1%9E%E4%BA%8E%E5%AE%9D%E5%AE%9D%E7%9A%84%E5%BD%B1%E5%83%8F%E7%BB%8F%E5%85%B8.731030/reply";
var iaskVerifyUrl = "";

var msg = casper.cli.args.slice(0,1)[0];
casper.start();

login
casper.start(loginUrl, function() {
    this.fill('#navbar_loginform', {
    	vb_login_username: "niaoyuetuzi",
    	vb_login_password: "112233"
    }, true);
    console.log('login finish');
});

wait for the redirect and setcookies
casper.wait(1000, function() {
    this.echo("Wait for the login process to finish...");
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
	console.log('post reply finish');
})

//verify if posting succeeds by checking the last post time
casper.thenOpen(postVerifyUrl, function(){
	
	var timestamp = casper.evaluate(function(){
		// return document.querySelector("ol#posts:first-child span.time").outerHTML;
		var nodes = document.querySelectorAll("li[id^='post'] span.time");
		// return nodes[nodes.length-1].getAttribute("id");
		return nodes[nodes.length-1].outerHTML+"---- "+nodes[0].outerHTML;;

	});
	console.log(timestamp);
	console.log('verify post finish');
})

casper.thenOpen(iaskLogin, function(){
	this.fill('#pageLogin', {
    	login: "alannesta",
    	password: "112233"
    }, true);
    console.log('login finish');
})

casper.wait(1000, function() {
    this.echo("Wait 1s for the login process to finish...");
});

casper.thenOpen(iaskPostUrl, function(){
	if (this.exists("#pageLogin")){
		console.log("login failed, please try again");
	}else{
		//switch to the iframe! this is the key to the reply process
		this.withFrame(0, function(){
			//pass the args into the evaluate function, otherwise would get undefined in the browser's context
			var data = this.evaluate(function(msg){
				// document.querySelector("p").innerText = "希望更多的妈妈能看到，选孕妈妈和宝宝套餐有有更多优惠哦";
				document.querySelector("p").innerText = msg;
				return document.querySelector("p").innerText;
			},msg);
			console.log(data);
		});
	}
})

casper.wait(2000, function() {
	this.echo("Wait 2s for the iframe processing");
	casper.fill("#ThreadReply", {}, true);	//the actual data is set in the iframe
});


casper.run(function() {
	console.log("done!");
	// this.exit();
});