/*
 Classic problem of dynamic programming:
 0-1 knapsack problem: restricts the number xi of copies of each kind of item to zero or one. Given a set of n items numbered from 1 up to n, each with a weight wi and a value vi, along with a maximum weight capacity W,

 The problem is to maximize the sum of the values of the items in the knapsack so that the sum of the weights is less than or equal to the knapsack's capacity.
 */

var collection = [{value: 4, weight: 2}, {value: 7, weight: 3}, {value: 4, weight: 4}, {value: 9, weight: 5}, {
	value: 7,
	weight: 6
}];
// var collection = [{value: 4, weight: 2}, {value: 7, weight: 3}, {value: 4, weight: 4}];
var maxWeight = 15;

console.log(knapsack(collection, maxWeight));

// function knapsack(collection, maxWeight) {
// 	var valueMatrix = createMatrix(collection.length, maxWeight);
// 	// the weight starts from 0, so need maxWeight + 1
// 	for (var j = 0; j < maxWeight + 1; j++) {
// 		for (var i = 0; i < collection.length; i++) {
// 			if (j === 0) {
// 				valueMatrix[i][j] = {value: 0, combo: []};
// 			} else if (j >= collection[i].weight) {
// 				// valueMatrix[i][j] = max(j - collection[i].weight, i, valueMatrix) + collection[i].value;
// 				var temp = max(j - collection[i].weight, i, valueMatrix, collection[i].value);
// 				if (temp.value > valueMatrix[i][j - 1].value) {
// 					valueMatrix[i][j] = Object.assign({}, temp);
// 				} else {
// 					valueMatrix[i][j] = Object.assign({}, valueMatrix[i][j - 1]);
// 				}
// 			}
// 		}
// 	}
//
// 	return valueMatrix;
//
// }
//
// function createMatrix(m, n) {
// 	var matrix = new Array(m);
// 	for (var i = 0; i < m; i++) {
// 		matrix[i] = new Array(n);
// 		for (var j = 0; j < matrix[i].length; j++) {
// 			matrix[i][j] = {value: 0, combo: []};
// 		}
// 	}
// 	return matrix;
// }
//
// // return the max value from a column
// function max(columnIndex, currentItemIndex, matrix, value) {
// 	var cMax = {value: 0, combo: []};
// 	for (var i = 0; i < matrix.length; i++) {
// 		console.log(matrix[i][columnIndex]);
// 		if (matrix[i][columnIndex].combo.indexOf(currentItemIndex) < 0 && matrix[i][columnIndex].value + value> cMax.value) {
// 			cMax = {value: matrix[i][columnIndex].value + value, combo: matrix[i][columnIndex].combo.concat(currentItemIndex)};
// 		}
// 	}
//
// 	return cMax;
// }

// official version:
function knapsack(collection, maxWeight) {
	var valueMatrix = createMatrix(collection.length, maxWeight);
	// the weight starts from 0, so need maxWeight + 1
	for (var j = 0; j < maxWeight; j++) {
		for (var i = 0; i < collection.length; i++) {
			if (j === 0 ) {
				valueMatrix[i][j] = 0
			} else if (j >= collection[i].weight){
				if (i === 0) {
					valueMatrix[i][j] = maxVal(collection, j);
				} else {
					if (valueMatrix[i-1][j] < valueMatrix[i-1][j-collection[i].weight] + collection[i].value) {
						valueMatrix[i][j] = valueMatrix[i-1][j-collection[i].weight] + collection[i].value
					} else {
						valueMatrix[i][j] = valueMatrix[i-1][j];
					}
				}
			} else {
				if (i === 0) {
					valueMatrix[i][j] = 0;
				} else {
					valueMatrix[i][j] = valueMatrix[i-1][j];
				}
			}
		}
	}
	return valueMatrix;
}

function maxVal(collection, j) {
	var max = 0;
	collection.forEach(function(item) {
		if (item.weight <= j && item.value > max) {
			max = item.value;
		}
	});
	return max;
}

function createMatrix(m, n) {
	var matrix = new Array(m);
	for (var i = 0; i < m; i++) {
		matrix[i] = new Array(n);
		for (var j = 0; j < matrix[i].length; j++) {
			matrix[i][j] = 0;
		}
	}
	return matrix;
}

