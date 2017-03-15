/*
 Classic problems which can be solved by Divide and Conquer
 */

// problem 1: merge sort
function DND() {
	var test = [1, 3, -5, 23, -11, 6, 37, 21, -31, 10, 9, 19];

	function dnd(collection) {
		// end condition: no need to divide any more
		if (collection.length === 1) {
			return collection;
		}

		var start = 0;
		var end = collection.length - 1;
		var mid = Math.floor((start + end) / 2);
		var leftCollection = collection.slice(start, mid + 1);
		var rightCollection = collection.slice(mid + 1, end + 1);

		var left = dnd(leftCollection);
		var right = dnd(rightCollection);

		// merge
		return merge(left, right);
	}

	// merge two sorted array
	function merge(a, b) {
		var merged = [];
		var i = j = 0;
		while (i < a.length) {
			while (j < b.length) {
				if (b[j] <= a[i]) {
					merged.push(b[j]);
					j++;
				} else {
					break;
				}
			}
			merged.push(a[i]);
			i++;
		}
		// push the remaining part of b;
		if (j < b.length) {
			for (var k = j; k < b.length; k++) {
				merged.push(b[k]);
			}
		}
		return merged;
	}

	console.log(dnd(test));
}

// ordered
function BinarySearch1() {
	var test = [1, 3, 23, -5, 23, -11, 6, 37, 21, -31, 10, 9, -11, 19];

	function binarySearch(collection, value) {
		// the sort function needs to be provided for numeric sorts in javascript, otherwise, magic will happen(will be sorted by string order)
		collection = collection.sort((a, b) => {
			return a - b;
		});
		console.log(collection);
		var start = 0;
		var end = collection.length - 1;
		var mid = -1;

		while (start <= end) {
			mid = Math.floor((start + end) / 2);
			if (value === collection[mid]) {
				return mid;
			}
			if (value > collection[mid]) {
				start = mid + 1;
			} else {
				end = mid - 1;
			}
		}
		return -1;
	}

	console.log(binarySearch(test, 21));
}

// un-ordered
function BinarySearch2() {
	var test = [1, 3, 23, -5, 23, -11, 6, 37, 21, -31, 10, 9, -11, 19];

	function binarySearch(collection, value, start, end) {
		var indexes = [];
		if (start === end) {
			if (collection[start] === value) {
				indexes.push(start);
			}
			return indexes;
		}

		var mid = Math.floor((start + end) / 2);

		var lIndex = binarySearch(collection, value, start, mid);
		var rIndex = binarySearch(collection, value, mid + 1, end);
		if (lIndex.length > 0) {
			indexes = indexes.concat(lIndex);
		}
		if (rIndex.length > 0) {
			indexes = indexes.concat(rIndex);
		}
		return indexes;
	}

	console.log(binarySearch(test, 23, 0, 13));
	// binarySearch(test, -11, 0, 12);
}


// the classic Hanoi problem, still remember the days when I am learning the C programming language at LanXiang(USTC)
function Hanoi() {
	function hanoi(n, start, mid, dest) {
		if (n === 1) {
			console.log(`moving from ${start} to ${dest}`);
			return 1;	// steps needed
		}

		return hanoi(n - 1, start, dest, mid) + hanoi(1, start, mid, dest) + hanoi(n - 1, mid, start, dest)
	}

	console.log(hanoi(3, 'A', 'B', 'C'));
}

DND();
BinarySearch1();
BinarySearch2();
Hanoi();
