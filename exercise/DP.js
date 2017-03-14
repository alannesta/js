/*
 Classic problems which can be solved by Dynamic Programming
 */

// problem: get the largest sum of consecutive sub-sequence
function LargestSum() {
	var test = [1, 3, -5, 23, -11, 6, 37, 21, -31, 10, 9, 7];

	function largeSum(collection) {
		var largest = [0];
		var lastIndex = -1;

		for (var i = 0; i < collection.length; i++) {
			if (i === 0 && collection[0] > 0) {
				largest[0] = collection[0];
				lastIndex = 0
			} else {
				if (collection[i] > 0 && lastIndex === i - 1) {
					largest[i] = largest[i-1] + collection[i];
					lastIndex = i;
				} else {
					if (sum(collection, lastIndex, i) > 0) {
						largest[i] = largest[i-1] + sum(collection, lastIndex, i);
						lastIndex = i;
					} else {
						if (largest[i-1] > sum(collection, lastIndex, i)) {
							largest[i] = largest[i-1];
						} else {
							largest[i] = sum(collection, lastIndex, i);
							lastIndex = i;
						}
					}

				}
			}
		}
		return largest;
	}

	function sum(collection, start, end) {
		var total = 0;
		for (var i = start + 1; i <= end; i++) {
			total += collection[i]
		}
		return total;
	}

	console.log(largeSum(test))
}

LargestSum();