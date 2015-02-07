var EventBus = function(){
	//this.handlers = {};
}	


EventBus.prototype.handlers = [];

EventBus.prototype.on = function(event, handler){
	if(this.handlers[event]){
		// Check duplication?
		this.handlers[event].push(handler);
	}else{
		this.handlers[event] = [];
		this.handlers[event].push(handler);
	}
}

EventBus.prototype.trigger = function(event){
    var self = this;
	// debugger;
	if (this.handlers[event]){
		for (var i=0, length = this.handlers[event].length; i<length; i++ ){
			this.handlers[event][i].apply(self, arguments);
            //this.handlers[event][i].apply(null, arguments);
		}
	}
}	

EventBus.prototype.off = function(event, handler){
	if (this.handlers[event] instanceof Array){
		for (var i=0, length = this.handlers[event].length; i<length; i++){
			if (this.handlers[event][i] === handler){
				break;
			}
		}
		this.handlers[event].splice(i,1);
	}
}


// inheritance demo

var CalendarWidget = function(){
	var self = this;
	// EventBus.apply(self);	// inherit instance variables, in this case: this.handlers
}
CalendarWidget.prototype = new EventBus();	// inherit prototype method


var cal1 = new CalendarWidget();
var cal2 = new CalendarWidget();

cal1.on('date change', function(){
	console.log('cal1 date change');
});

cal2.on('date change', function(){
	console.log('cal2 date change');
});

//console.log(cal1);
//console.log(cal2);
//cal1.trigger('date change');
//cal2.trigger('date change');
