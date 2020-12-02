const fs = require('fs');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
	console.log('an event occurred!');
});

function blocking() {
	console.log('while loop start');

	var count = 0;
	var timestamp = new Date().getTime();
	while (new Date().getTime() - timestamp < 3000) {
		count++;
		if (count === 20000) {
			process.nextTick(() => {
				console.log('process next tick execute registered later');
			});
			myEmitter.emit('event');	// execute synchronously on current callstack
		}
	}
	console.log('while loop done');
}

fs.readFile('./glob.js', function() {
	console.log('read file done');	// polling phase
});

setTimeout(function() {
	console.log('set timeout');		// timer phase
}, 1000);

process.nextTick(() => {
	console.log('process next tick execute');
});

blocking();

// results:
// while loop start
// an event occurred!
// while loop done
// process next tick execute
// process next tick execute registered later
// set timeout
// read file done
