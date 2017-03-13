/*
 Depth first search and related applications
 Backtracking is powered by DFS
 */
function DFS_basic() {
	var visited = [];
	var maxDepth = 2;
	var testData = {
		root: {
			value: 0,
			left: {
				value: 1,
				left: {value: 3, left: null, right: null},
				right: {value: 4, left: null, right: null}
			},
			right: {
				value: 2,
				left: {value: 5, left: null, right: null},
				right: {value: 6, left: null, right: null}
			}
		}
	};

	function DFS(node, depth) {
		if (depth > maxDepth) {
			return;
		}

		// the visited check here seems redundant
		// if (!visited.find((visited) => {
		// 		visited.value === node.value
		// 	})) {
		// 	visited.push(node);
		// 	process(node);
		// 	DFS(node.left, depth + 1);
		// 	DFS(node.right, depth + 1);
		// }
		// visited.push(node);
		process(node);
		DFS(node.left, depth + 1);
		DFS(node.right, depth + 1);
	}

	function process(node) {
		console.log(node.value);
	}

	DFS(testData.root, 0);
}

/*
 Problem: find all subsets of a collection
 */
function Subsets() {
	var collection = [1, 2, 3];
	var result = [];
	var searchTemp = [];	// store temp information for current search
	function subsets(collections, currentIndex, include) {

		searchTemp[currentIndex] = include;	// mark as included for 1, non-included for 0

		// continue traversal till end of tree
		if (currentIndex + 1 <= collections.length - 1) {
			subsets(collections, currentIndex + 1, 1);	// search left leaf
			subsets(collections, currentIndex + 1, 0);	// search right leaf
		}

		// at the end of the tree, push current solution to result
		if (currentIndex === collections.length - 1) {
			result.push(collections.filter((item, index) => {
				return searchTemp[index] === 1;
			}));
		}
	}

	subsets(collection, 0, 0);	// not include the first element
	subsets(collection, 0, 1);	// include the first element

	console.log(result);
}


function Subsets2() {
	var collection = [1, 2, 3];
	var result = [];
	var searchTemp = [];	// store temp information for current search
	function subsets(collections, currentIndex) {
		// TODO: a better version
	}

	subsets(collection, 0);

	console.log(result);
}

/*
 Problem: find all subsets in a collection which sum up to X
 */
function Xsum() {
	var collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, -2, -3, -5];
	var solutions = [];
	var searchTemp = [];
	var target = 10;
	collection.sort();

	function xSum(collections, index) {
		if (sum(searchTemp) === target) {
			solutions.push(collection.filter((item, index) => {
				return searchTemp[index] === 1;
			}));
			return;
		}
		if (index > collections.length - 1) {
			return;
		}
		for (let i = 0; i < 2; i++) {
			searchTemp[index] = i;
			xSum(collections, index + 1);
		}
	}

	function sum(temp) {
		if (temp.length > 0) {
			return collection.filter((item, index) => {
				return temp[index] === 1;
			}).reduce((acc, val) => {
				return acc + val;
			}, 0);
		}
		return undefined;
	}

	xSum(collection, 0);
	console.log(solutions);
}

// DFS_basic();
// Subsets();
// Subsets2();
Xsum();
