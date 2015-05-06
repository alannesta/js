function factorial(k) {
	var result = 1
	while(k > 0){
		result = result * k;
		k--;
	}
	return result;
}

function combination(n, k) {
	var result = 0;

	if (n < k) {
		throw new Error('k must be smaller than n');
	}

	result = factorial(n)/(factorial(n-k)*factorial(k));
	return result;

}

// console.log(factorial(0));
// console.log(combination(27, 22)/combination(30, 25));