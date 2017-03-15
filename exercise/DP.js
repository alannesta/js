/*
 Classic problems which can be solved by Dynamic Programming
 */

// problem: maximum sub array: get the largest sum of consecutive sub-sequence
function LargestSum() {
	var test = [1, 3, -5, 23, -11, 6, 37, 21, -31, 10, 9, 19];

	function dpLargeSum(collection) {
		var largest = [];
		largest[0] = collection[0];
		// var lastIndex = 0;
		for (var i = 1; i < collection.length; i++) {
			// largest[i] represents the largest sum for sub sequence ending with collection[i]
			// largest[i] does not mean the largest sum for the first i items (which could make things much more complicated)
			largest[i] = largest[i - 1] + collection[i] > collection[i] ? largest[i - 1] + collection[i] : collection[i];
		}
		console.log(largest);
		return max(largest);
	}

	function max(collection) {
		var maxVal = collection[0];
		collection.forEach((item) => {
			if (item > maxVal) {
				maxVal = item;
			}
		});
		return maxVal;
	}

	function bruteForce(collection) {
		var sum = 0;
		var max = 0;
		// starting index
		for (var i = 0; i < collection.length; i++) {
			// define the length of this loop
			for (var j = 0; j < collection.length - i; j++) {
				// starting index to index + length
				for (var k = i; k < j + i + 1; k++) {
					sum += collection[k]
				}
				if (sum > max) {
					max = sum;
				}
				sum = 0;
			}
		}
		return max;
	}

	console.log(dpLargeSum(test));
	console.log(bruteForce(test));
}

LargestSum();
