function callee(age) {
	console.log(age);
}

// rest parameter
function caller(...args) {
	callee(...args);	// spread operator
	callee(args);	// wrong!
}

caller(12);	// 12

caller(12, 13)	// 12