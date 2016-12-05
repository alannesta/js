'use strict';

function* idMaker(){
	let index = 0;
	while(index < 10)
		yield index++;
}

function* generatorDemo() {
	let a = function() {
		return 10;
	};

	let c = yield a;
	console.log('value received from caller: ', c);
}

// test in node
//let iterator = idMaker();
//console.log(iterator.next().value);
//console.log(iterator.next().value);
//console.log(iterator.next().value);
//console.log(iterator.next().value);

// in and out
let iterator = generatorDemo();
let fn = iterator.next().value;
console.log('value received from generator: ', typeof fn);
console.log('resume execution');
iterator.next(fn.call());	// resume execution, pass in value

module.exports = idMaker;
