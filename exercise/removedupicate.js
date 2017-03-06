/*
 Problem: Extend the JavaScript Array object by adding a method that removes duplicates.
 */

var arr = [22, 1, 23, 1, 3, 2, 3, 3, 4, 5, 77, 5, 13];
//
// Array.prototype.removeDup = function(){
// 	var newArr = [], that = this;
// 	that.forEach(function(item, index){
// 		if (newArr.indexOf(item) == -1){
// 			newArr.push(item);
// 		}
// 	});
//
// 	//clear the original value and push unduplicated ones back
// 	this.splice(0, this.length);
// 	newArr.forEach(function(item, index){
// 		that.push(item);
// 	})
// };
//
// arr.removeDup();


/*
 Complexity analysis/benchmark:
 1. return a new array
 2. return a new map
 3. ES6 set
 4. reverse index loop
 */

function generateTestArr(n) {
	var arr = [];
	for (var i = 0; i < n; i++) {
		arr.push(parseInt(Math.random() * 100000, 10));
	}
	return arr;
}

var testArr = generateTestArr(40000);

// 1. return a new array
// this algorithm is not O(n) complexity though, because indexOf() is also of O(n) complexity
// so the total complexity is close to O(n2)
function removeDupArr(collection) {
	var newArr = [];
	var timeStamp = new Date().getTime();
	collection.forEach((elem) => {
		if (newArr.indexOf(elem) < 0) {
			newArr.push(elem);
		}
	});
	console.log('arr time used: ', new Date().getTime() - timeStamp);
	return newArr;
}

// 2.use map:
// almost as fast as the Set method
function removeDupMap(collection) {
	var map = {};
	var arr = [];
	var timeStamp = new Date().getTime();

	collection.forEach((elem) => {
		if (!map[elem]) {
			map[elem] = true;
			arr.push(elem);
		}
	});
	console.log('map time used: ', new Date().getTime() - timeStamp);

	return arr;
}

// 3. use ES6 set
// fastest way
function removeDupSet(collection) {
	var timeStamp = new Date().getTime();
	var set = new Set(collection);
	console.log('set time used: ', new Date().getTime() - timeStamp);
	return Array.from(set);
}

// 4. reverse traversal
// when the remove element operation becomes too frequent, it becomes very slow
// function removeDupLoop(collection) {
// 	var timeStamp = new Date().getTime();
//
// 	for (let i = collection.length - 1; i > 0; i--) {
// 		for (let j = i - 1; j >=0 ; j--) {
// 			if (collection[i] === collection[j]) {
// 				collection.splice(j, 1);
// 			}
// 		}
// 	}
// 	console.log('loop time used: ', new Date().getTime() - timeStamp);
//
// 	return collection;
// }

function removeDupLoop(collection) {
	var timeStamp = new Date().getTime();
	var map = {};
	// pay attention to index condition when looping reversely
	for (let i = collection.length - 1; i >= 0; i--) {
		if (!map[collection[i]]) {
			map[collection[i]] = true;
		} else {
			collection.splice(i, 1);
		}
	}
	console.log('loop time used: ', new Date().getTime() - timeStamp);

	return collection;
}


console.log(removeDupArr(testArr).length);
// console.log(removeDupMap(testArr).length);
console.log(removeDupLoop(testArr).length);
// console.log(removeDupSet(testArr).length);
