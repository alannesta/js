function flatten(arr) {
	return arr.reduce(function(mem, ele) {
		if (ele instanceof Array) {
			merge(mem, flatten(ele));
		}else {
			mem.push(ele);
		}
		console.log(mem);
		return mem;
	}, []);

	function merge(target, array) {
		array.forEach(function(item) {
			target.push(item);
		});
		return target;
	}
}

const arr = [1, 2, 3, [[[4, 5], 6]], [7, 8, 9, [10, 11]], 12];

console.log(flatten(arr));
