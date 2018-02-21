"use strict";

/**
 * spread operator and rest parameter both use three dots: ... , and are sometimes confusing
 */

// In this case, ...keys is rest parameter (when you define a function)
let pick = function(obj, ...keys) {

	let temp = {};

	// "keys" is an array
	console.log(keys);	// [ 'name', 'title' ]
	console.log(keys instanceof Array);	// true

	keys.forEach(function(key) {
		if (key in obj) {
			temp[key] = obj[key];
		}
	});
	return temp;
};

const obj = {
	name: 'kaka',
	title: 'dev',
	lang: 'eng'
};


console.log(pick(obj, 'name', 'title'));	// { name: 'kaka', title: 'dev' }

/*
 Equivalent ES5 (underscore implementation)
 */

//var pick = function(obj) {
//	var copy = {};
//	var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
//	each(keys, function(key) {
//		if (key in obj) copy[key] = obj[key];
//	});
//	return copy;
//};


/*
	Usage with call()/apply()
*/

function someLibFunc(a, b, ...c) {
	return c.reduce((agg, cur) => {
		return agg + cur;
	}, a + b);
}

function wrapper(customArg, ...others) {
	console.log(...others);	// 1 2 3 !! this is not an array
	console.log(someLibFunc.call(null, ...others));	// ...others will expand the arguments one by one
	console.log(someLibFunc.apply(null, others));
}

wrapper('test', 1, 2, 3, 4, 5);


// In this case, ... is the spread operator(when you call a function rather than define one)
function spreadAble(a, b, c) {
	return a + b + c;
}

let a = [5,1,2,3,4];

console.log(spreadAble(...a));	//8


/**
 *    Spread operator is a good substitution for the array concat/splice method
 */

// ES5, arr1 will be modified
// let arr1 = [1,2,3];
// let arr2 = arr1.push(4);

// console.log(arr1);

//ES6, actually a great way of "deep copy" the array
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4];

console.log(arr2);		// arr1 remains untouched
