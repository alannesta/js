'use strict';

function* idMaker(){
	let index = 0;
	while(index < 10)
		yield index++;
}

function* generatorDemo() {
	// let a = function() {
	// 	return 10;
	// };
	//
	// let b = new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		resolve('promise resovled');
	// 	}, 1500);
	// });
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
	let errFn = function() {
		return JSON.parse('2');
		//return JSON.parse({name: "kaka"});
	};

	let asyncThunk = function() {
		return function(callback) {
			setTimeout(function() {
				try {
					callback(null, JSON.parse({name: "kaka"}));
				} catch (err) {
					callback(err);
				}

			},1500);
		}
	};

	try {
		yield 5;
		yield errFn();
		yield asyncThunk;
		yield 'back to normal';
	}catch(err) {
		console.log('handle error: ', err);
	}

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
console.log(iterator.next());
let asyncThunk = iterator.next().value;
console.log(asyncThunk);
new Promise((resolve, reject) => {
	asyncThunk().call(null, (err, result) => {
		if(err) {
			reject(err);
		}
		resolve(result);
	});
}).then((result) => {
	console.log(iterator.next(result));
}).catch((err) => {
	console.log('error handled, throw back?: ', err);
	//iterator.throw(err);	// iterator will continue execution if err is not throw back
	console.log(iterator.next());
	console.log(iterator.next());
});

module.exports = idMaker;
