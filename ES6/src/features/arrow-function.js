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

/**
 * Arrow function should be used as "throwaway" functions rather than "top level" functions.
 *
 * It should always be defined with a containing function context(so that "this" is defined)
 */

// 假设当前运行环境为浏览器，故顶层作上下文为 `window`
let obj3 = {
	msg: 'pong',

	ping: () => {
		console.log(this.msg); // Warning!
	}
};

// obj3.ping(); //=> undefined


/**
 * Implicit return only when the arrow function body is in one line && without {}
 */
//let arr = [1,3,4,5];

//let func = ()=> arr.splice(1,1);
//
//
//console.log(func());	// [3]
//console.log(arr);

