'use strict';

/** ------------- arr operations ---------------*/

//The map() method creates a new array with the results of calling a provided function on every element in this array.
// var arr = [1,2,3,4,5];
// var newarr = arr.map(function(item, index){		//a new array is returned, the original one remains unchanged
// 	return item = item*2;
// })
// console.log(arr);
// console.log(newarr);
// var arr = [1, 2, 3, 4, 5, 6];
// arr.map(function (v, k) {
//     // console.log(k);
//     arr.splice(k, 1);		//splice will cause the arr change immidiately(before the next maped function call), which 
// });
// console.log(arr);	//[2,4,6];

//operate the array itself in forEach() loop
// var arr2 = [1,2,3,4,5,6];
// arr2.forEach(function(num, index){
// 	console.log(index);
// 	arr2.splice(arr2.indexOf(num), 1);
// 	arr2.push(num);
// });

// console.log(arr2);	// [2,4,6,3,1,5]
// console.log(arr2);
// arr2.forEach(function(num){
// 	arr2.splice(arr2.indexOf(num), 1);
// 	arr2.push(num);

// });
// console.log(arr2);

// slice vs splice
var arr = ['hello', 'world', 'nihao', 'shijie'];
//slice(start, end)
var temp = arr.slice(1,2);		//shallow copy, will not change the arr itself
temp[0] = "changed";
console.log(temp);		
console.log(arr);		//[ 'hello', 'world', 'nihao', 'shijie' ]

var arr2 = ['hello', 'world', 'nihao', 'shijie'];
//slice(startindex, count)
console.log(arr2.splice(1,2));	//[ 'hello', 'world' ]  change the original arr
console.log(arr2);		//[ 'nihao', 'shijie' ]






/**--------------String operations---------------*/




