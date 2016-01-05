'use strict';

class EventAggregator {
	constructor() {
		this._eventMap = {};
	}

	on(event, callback) {
		if (this._eventMap[event] !== undefined) {
			this._eventMap[event] = [...this._eventMap[event], callback];
		}else {
			this._eventMap[event] = [].concat(callback);
		}
	}

	off(event) {
		delete this._eventMap[event];
	}

	trigger(event) {
		if (this._eventMap[event]) {
			this._eventMap[event].forEach(function(callback) {
				callback.call();
			})
		}
	}
}


class Actor extends EventAggregator {
	constructor(bus) {
		super();
		this.eventBus = bus;
		this.eventBus.on('start', this.act);
		this.eventBus.on('start', function() {
			console.log('xi ju zhi wang');
		});
		this.eventBus.on('stop', this.cut);
		this.on('retire', function() {
			console.log('retire');
		})
	}

	act() {
		console.log('ren sheng ru xi, xi ru ren sheng');
	}

	cut() {
		console.log('qi shi wo shi yi ge yan yuan');
	}

	retire() {
		this.eventBus.off('start');
		this.eventBus.off('stop');
		this.trigger('retire');
	}
}

class Director extends EventAggregator {
	constructor(bus) {
		super();
		this.eventBus = bus;
	}

	start() {
		this.eventBus.trigger('start');
	}

	stop() {
		this.eventBus.trigger('stop');
	}
}

var bus = new EventAggregator();

var wangjin = new Director(bus);
var zhouxinchi = new Actor(bus);

wangjin.start();
wangjin.stop();
zhouxinchi.retire();
wangjin.start();
