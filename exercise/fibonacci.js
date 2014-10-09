/*
	Problem: find the nth Fibonacci number
*/

//without caching/memoization
function fibonacci(n){
	if (n<2){
		return n;
	}else{
		return fibonacci(n-2) + fibonacci(n-1);
	}
}

// console.log(fibonacci(40));

//with cache/memoization---> much faster
var cache = [];
function fibonacci(n){
	if (n<2){
		cache[n] = n;
		return n;
	}else{
		var v1 = cache[n-1]? cache[n-1]: fibonacci(n-1);
		var v2 = cache[n-2]? cache[n-2]: fibonacci(n-2);
		cache[n] = v1 + v2
		return cache[n];
	}
}
console.log(fibonacci(10));