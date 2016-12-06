'use strict';

var fs = require('fs');	// only for node

function* idMaker(){
	let index = 0;
	while(index < 10)
		yield index++;
}

function* generatorDemo() {
	console.log('2. [GEN] generator yield');
	// let c = yield a;
	// directly yield an expression
	let c = yield function() {
		return 10;
	};
	console.log('5. [GEN] value received from caller: ', c);
	console.log('6. [GEN] generator yield');
	// let d = yield b;
	let d = yield new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('promise resovled');
		}, 1500);
	});
	console.log('8. [GEN] value received from caller: ', d);
}

function* errorHandling() {

	let asyncThunk = function() {

		// for web project, plz use this one
		// return function(callback) {
		// 	setTimeout(function() {
		// 		try {
		// 			callback(null, JSON.parse({name: "kaka"}));
		// 		} catch (err) {
		// 			callback(err);
		// 		}
		// 	},1500);
		// }

		// return a thunk function (for node test)
		return (callback) => {
			fs.readFile('./non-exist.js', callback);
		}
	};

	// catch errors in own expressions or errors thrown back by the caller
	try {
		yield 5;
		// yield JSON.parse({name: "kaka"});	// error will be caught directly in the generator
		yield asyncThunk();
	}catch(err) {
		console.log('iterator handle error: ', err);
	}

	yield 'continue execution';

}

// gasic generator
//let iterator = idMaker();
//console.log(iterator.next().value);
//console.log(iterator.next().value);
//console.log(iterator.next().value);
//console.log(iterator.next().value);

// in and out
//let iterator = generatorDemo();
//console.log('1. [CALLER] kick start generator');
//let fn = iterator.next().value;
//console.log('3. [CALLER] calling next, value received from generator: ', typeof fn);
//console.log('4. [CALLER] resume execution, pass back function execution result');
//let promise = iterator.next(fn.call()).value;	// resume execution, pass in value, paused at next yield which yield a promise
//if (typeof promise.then === 'function') {
//	promise.then((val) => {
//		console.log('7. [CALLER] calling next, promise resolved, passback result');
//		let generatorEnd = iterator.next(val);
//		console.log('9. [CALLER] generator execution ended');
//		console.log(generatorEnd);
//	});
//}

// error handling
let iterator = errorHandling();
console.log(iterator.next());
// console.log(iterator.next());
let asyncThunk = iterator.next().value;		// here we get the thunk function
if (asyncThunk instanceof Function) {
	asyncThunk.call(null, (err, result) => {
		if (err) {

			// need to use try...catch... here, otherwise, if err is not handled in the generator, execution will be
			// terminated.
			try {
				console.log('error in caller, throw back to generator');
				// if error is properly handled in the generator, will return next value in the sequence
				console.log(iterator.throw(err));
			}catch(e) {
				// if the err is not handled by the generator, will be able to do some cleanup here
				console.log('generator not handling the error: ', e);
				// do some clean up job...
			}
		} else {
			iterator.next(result);
		}
	});
}

module.exports = idMaker;
