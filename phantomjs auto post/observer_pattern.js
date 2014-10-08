/**
  manage the login process through observer pattern
*/
var page = require('webpage').create(),
    server = 'http://www.sinoquebec.com/bbs/login.php?do=login',
    data = 'vb_login_username=niaoyuetuzi&vb_login_password=&vb_login_password_hint=Password&s=&securitytoken=1412627907-8abd9441ae5cd77c0d24687e82eb75d8832c6289&do=login&vb_login_md5password=d0970714757783e6cf17b26fb8e2298f&vb_login_md5password_utf=d0970714757783e6cf17b26fb8e2298f';

var pageloadCount = 0, loadInProgress = false, currentUrl = server;

//observer object
function Observer(identifier){
  this.observeArr = [];
  this.identifier = identifier;
}

Observer.prototype.subscribe = function(observable){
  this.observeArr.push(observable);
  observable.subscriberArr.push(this);
}

Observer.prototype.unsubscribe = function(observable){
  var index = -1;
  var that = this;
  removeObjFromArr(this.observeArr, observable, 'identifier');
  removeObjFromArr(observable.subscriberArr, this, 'identifier');
}

Observer.prototype.onEvent = function(observable){
  (observable.callback)();
}

//observable object 

function Observable(identifier, callback){
  this.identifier = identifier;
  this.callback = callback;
  this.subscriberArr = [];
}

Observable.prototype.notify = function(){
  var that = this
  this.subscriberArr.forEach(function(item, index){
    item.onEvent(that);
  })
}

function removeObjFromArr(arr, obj, key){
  if (!obj.hasOwnProperty(key) || arr.length == 0) return;
  var indexArr = [];
  arr.forEach(function(item, index){
    if (item.key === obj.key){
      var index = arr.indexOf(item);
      arr.splice(index, 1);
    }
  })
}

var coordinator = new Observer("manager");
var loginProc = new Observable("login", gotoReplyPage);
var gotoReplyProc = new Observable("gotoReply", postReply);
coordinator.subscribe(loginProc);
coordinator.subscribe(gotoReplyProc);



function login(){
	page.open(server, 'post', data, function (status) {
	    if (status !== 'success') {
	        console.log('Unable to login!');
	        phantom.exit();
	    } else {
	     	loginProc.notify();		//notify the observer and execute next step(passed in as callback)
	    }
	});
}

function gotoReplyPage(){
	page.open('http://www.sinoquebec.com/bbs/newreply.php?p=3439042&noquote=1', function(status){
  		// console.log(status);
  		if(status == "success"){
  			// console.log(page.content);
  			var dom = page.evaluate(function(){
  				//all the dom operation should be done within the page.evaluate
  				// return document.querySelector("input[name='posthash']").getAttribute('value');
  				document.querySelector("textarea").value = "I really like those professional musical players on my wedding";
  				document.querySelector("form.vbform").submit();
  				return document.querySelector("textarea")
  			});
  			// console.log(dom.value);	//here dom.getAttribute will not work
  			gotoReplyProc.notify();	//notify the observer and execute next step(passed in as callback)
  		}else{
  			console.log("failed");
  			phantom.exit();
  		}
  	});
}

function postReply(){
	console.log("success");
}


page.onUrlChanged = function(targetUrl) {
  console.log('New URL: ' + targetUrl);
  currentUrl = targetUrl  //store the url and check against them in LoadFinished event
};

login();