var fs = require('fs');
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
			myEmitter.emit('event');	// polling phase

		}
	}
	console.log('while loop done');
}

fs.readFile('./glob.js', function() {
	console.log('read file done');	// I/O callbacks phase
});

setTimeout(function() {
	console.log('set timeout');		// timer phase
}, 1000);

blocking();

// results:
// while loop start
// an event occurred!  (类似于browser端的dom events)
// while loop done
// set timeout    (timers)
// read file done   (I/O callbacks)
