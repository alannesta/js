"use strict";

/**
 * the classical closure problem easily solved
 */

for (let i = 0; i < 5; i++) {
	setTimeout(() => console.log(i), i * 1000);
}

/**
 * variable is now scoped to brackets
 */

const a = 10;

let b = 20;

if (a < 100) {
	let b = 'Scoped Variable 1';
}

var c = 20;

if (a < 100) {
	var c = 'changed';
}

console.log(b);		// 20
console.log(c);		// changed
