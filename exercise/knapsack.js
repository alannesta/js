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
var maxWeight = 10;

console.log(knapsack(collection, maxWeight).valueMatrix);
// console.log(knapsack(collection, maxWeight).compMatrix);
console.log(knapsack2(collection, maxWeight));

function knapsack(collection, maxWeight) {
	var valueMatrix = createMatrix(collection.length, maxWeight + 1, 0);
	var compMatrix = createMatrix(collection.length, maxWeight + 1, []);
	// the weight starts from 0, so need maxWeight + 1
	for (var j = 0; j < maxWeight + 1; j++) {
		for (var i = 0; i < collection.length; i++) {
			if (j === 0) {
				valueMatrix[i][j] = 0;
				compMatrix[i][j] = [];
			} else if (j >= collection[i].weight) {
				var temp = max(j, i, collection[i].weight, collection[i].value);
				if (temp > valueMatrix[i][j - 1]) {
					valueMatrix[i][j] = temp;
				} else {
					valueMatrix[i][j] = valueMatrix[i][j - 1];
					compMatrix[i][j] = [].concat(compMatrix[i][j-1]);
				}
			} else {
				valueMatrix[i][j] = valueMatrix[i][j - 1];
				compMatrix[i][j] = [].concat(compMatrix[i][j-1]);
			}
		}
	}

	// return the max value from a column
	function max(columnIndex, currentItemIndex, weight, value) {
		var cMax = 0;
		for (var i = 0; i < valueMatrix.length; i++) {
			if (compMatrix[i][columnIndex-weight].indexOf(currentItemIndex) < 0 && valueMatrix[i][columnIndex-weight] + value> cMax) {
				cMax = valueMatrix[i][columnIndex-weight] + value;
				compMatrix[currentItemIndex][columnIndex] = compMatrix[i][columnIndex-weight].concat(currentItemIndex);
			}
		}
		return cMax;
	}

	return {
		valueMatrix,
		compMatrix
	};
}

// official version:
function knapsack2(collection, maxWeight) {
	var valueMatrix = createMatrix(collection.length + 1, maxWeight + 1, 0);
	// the weight starts from 0, so need maxWeight + 1 to generate 1 more row
	for (var j = 0; j < maxWeight + 1; j++) {
		for (var i = 0; i < collection.length + 1; i++) {
			if (j === 0 || i === 0) {
				valueMatrix[i][j] = 0
			} else if (j >= collection[i-1].weight){
				if (valueMatrix[i-1][j] < valueMatrix[i-1][j-collection[i-1].weight] + collection[i-1].value) {
					valueMatrix[i][j] = valueMatrix[i-1][j-collection[i-1].weight] + collection[i-1].value
				} else {
					valueMatrix[i][j] = valueMatrix[i-1][j];
				}
			} else {
				valueMatrix[i][j] = valueMatrix[i-1][j];
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

function createMatrix(m, n, initialVal) {
	var matrix = new Array(m);
	for (var i = 0; i < m; i++) {
		matrix[i] = new Array(n);
		for (var j = 0; j < matrix[i].length; j++) {
			matrix[i][j] = initialVal;
		}
	}
	return matrix;
}
