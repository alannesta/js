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

// test in node
//let iterator = idMaker();
//console.log(iterator.next().value);
//console.log(iterator.next().value);
//console.log(iterator.next().value);
//console.log(iterator.next().value);

// in and out
let iterator = generatorDemo();
console.log('1. [CALLER] kick start generator');
let fn = iterator.next().value;
console.log('3. [CALLER] calling next, value received from generator: ', typeof fn);
console.log('4. [CALLER] resume execution, pass back function execution result');
let promise = iterator.next(fn.call()).value;	// resume execution, pass in value, paused at next yield which yield a promise
if (typeof promise.then === 'function') {
	promise.then((val) => {
		console.log('7. [CALLER] calling next, promise resolved, passback result');
		let generatorEnd = iterator.next(val);
		console.log('9. [CALLER] generator execution ended');
		console.log(generatorEnd);
	});
}


module.exports = idMaker;
