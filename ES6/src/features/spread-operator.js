"use strict";

/**
 * spread operator and rest parameter both use three dots: ... , and are sometimes confusing
 */

// In this case, ...keys is rest parameter (when you define a function)
let pick = function(obj, ...keys) {

	let temp = {};

	keys.forEach(function(key) {
		if (key in obj) {
			temp[key] = obj[key];
		}
	});
	return temp;
};

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


const obj = {
	name: 'kaka',
	title: 'dev',
	lang: 'eng'
};

console.log(pick(obj, 'name'));


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
