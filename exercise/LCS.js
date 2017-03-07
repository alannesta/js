/*
 Get longest common substring
 */
var fs = require('fs');

var content = fs.readFileSync('/Users/alancao/git/mining/data/raw', 'utf-8');

var kaka = content.split('\n').splice(0, 1000);
console.log(kaka.length);
console.log(dedupe(kaka).length);

function dedupe(collection) {
	console.time('dedupe');
	for (var i = 0; i < collection.length; i++) {
		for (var j = i + 1; j < collection.length; j++) {
			let {maxLen} = DPLCS(collection[i], collection[j]);
			if (maxLen > 7) {
				collection[j] = '';
			}
		}
	}
	console.timeEnd('dedupe');
	return collection.filter((item) => {
		return item.length > 0;
	})
}

/**
 * brute force
 * @param a
 * @param b
 * @returns {string} the longest common substring
 */
//function LCS(a, b) {
//	var common = {};
//	var flag = 0;
//	for (let i = 0; i < a.length; i++) {
//		for (let j = i; j < a.length; j++) {
//			//console.log(a.substring(i, j));
//			if (b.indexOf(a.substring(i, j)) > -1) {
//				common[i] = a.substring(i, j);
//			} else {
//				break;
//			}
//		}
//	}
//	return common;
//}

//console.log(LCS(str1, str2));

/**
 * Dynamic programming
 * @param {array} a
 * @param {array} b
 * @returns {object} {maxLength, endIndex of the common string(string1)}
 */
function DPLCS(a, b) {
	var common = createArray(a.length, b.length);
	var maxLen = 0;
	var endIndexA = 0;
	for (let i = 0; i < a.length; i++) {
		for (let j = 0; j < b.length; j++) {
			if (a[i] === b[j]) {
				if (i === 0 || j === 0) {
					common[i][j] = 1;
				} else {
					common[i][j] = common[i - 1][j - 1] + 1;
				}
				if (common[i][j] > maxLen) {
					maxLen = common[i][j];
					endIndexA = i;
				}
			} else {
				common[i][j] = 0;
			}
		}
	}
	return {
		maxLen,
		endIndexA
	}
}

function createArray(m, n) {
	var dimentionalArray = new Array(m);
	for (var i = 0; i < m; i++) {
		dimentionalArray[i] = new Array(n);
		for (var j = 0; j < dimentionalArray[i].length; j++) {
			dimentionalArray[i][j] = '';
		}
	}
	return dimentionalArray;
}

function max(arr) {
	cmax = arr[0];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].length > cmax.length) {
			cmax = arr[i];
		}
	}
	return cmax;
}

//var {maxLen, endIndexA} = DPLCS(str1.split(''), str2.split(''));
//console.log('longest common string: ', str1.substring(endIndexA - maxLen + 1, endIndexA + 1));