var links = [];
var casper = require('casper').create();

casper.start('http://www.sinoquebec.com/bbs/index.php', function() {
	console.log('step1 finish');
    // search for 'casperjs' from google form
    this.fill('#navbar_loginform', {
    	vb_login_username: "niaoyuetuzi",
    	vb_login_password: "112233"
    }, true);
});

casper.then(function() {
	console.log('step2 begin')
    casper.open("http://www.sinoquebec.com/bbs/newreply.php?p=3435485&noquote=1", function(){
    	console.log('step2 finish');
    	// var token = casper.evaluate(function(){
    	// 	return document.querySelector("input[name='securitytoken']").getAttribute("value");
    	// });
    	// if (token =="guest"){
    	// 	console.log("login failed, please try again");
    	// }else{
    	// 	casper.fill("form[name='vbform']", {
    	// 		title: "如果不收税那是最好了",
    	// 		message: "如果不收税那是最好了"
    	// 	}, true)
    	// }
    	
    })
});

casper.then(function(){
	casper.open("http://www.sinoquebec.com/bbs/showthread.php?t=1037992", function(){
		console.log('step3');
		var timestamp = casper.evaluate(function(){
		// return document.querySelector("ol#posts:first-child span.time").outerHTML;
		var nodes = document.querySelectorAll("li[id^='post'] span.time");
		// return nodes[nodes.length-1].getAttribute("id");
		return nodes[nodes.length-1].outerHTML;

	});
		console.log(timestamp);
	})
	
})



casper.run(function() {
	console.log("done!");
	// this.exit();
});