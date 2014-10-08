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
	// if (indexArr.length>0){

	// }

}


var ob = new Observer("dajiangyou");
var player1 = new Observable("libo", function(){
	console.log("champion of WCA 2014");
});

var player2 = new Observable("trumph", function(){
	console.log("junk player");
});

var player3 = new Observable("xiaoyuyu", function(){
	console.log("runnerup of WCA 2014");
});


ob.subscribe(player1);
ob.subscribe(player2);
ob.subscribe(player3);
ob.unsubscribe(player2);
console.log("gg, hf");
setTimeout(function(){
	player1.notify();
	player2.notify();
	player3.notify();
}, 2000);

