"use strict";

/**
 * Retaining "this" scope:
 *
 * Arrow functions have no this binding, which means the value of this inside an arrow function
 * can only be determined by looking up the scope chain.If the arrow function is contained within
 * a nonarrow function, this will be the same as the containing function; otherwise, this is undefined.
 *
 *
 * 对arrow function内部的上下文 （this）绑定为定义函数所在的作用域的上下文。
 */

let obj = {

	doStuff() {
		let callback = function() {
			this.doOtherStuff();
		};
		setTimeout(callback, 1000)
	},

	doOtherStuff() {
		console.log('do other stuff after 1 sec');
	}

};

//obj.doStuff();		// Error: this.doOtherStuff is not a function

let obj2 = {

	doStuff() {
		let callback = () => this.doOtherStuff();
		setTimeout(callback, 1000)
	},

	doOtherStuff() {
		console.log('do other stuff after 1 sec');
	}

};

//obj2.doStuff();		// Correct


let arr = [1,3,4,5];

/**
 * Implicit return only when the arrow function body is in one line && without {}
 */
let func = ()=> arr.splice(1,1);


console.log(func());	// [3]
console.log(arr);
