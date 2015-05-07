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
console.log((combination(26, 7)*4 + combination(26, 6)*2 + combination(26,5) ) / combination(30, 9));	// 9 fei paoxiao yi tao
console.log((combination(26, 9)*4 + combination(26, 8)*2 + combination(26,7) ) / combination(30, 11));	// 9 fei paoxiao yi tao (guo 2 zhang pai)

console.log(1- (combination(28, 9)/combination(30, 9)));	// 6 fei you shi zi, bai fu mei
console.log(1- (combination(28, 10)/combination(30, 10)));	// 6 fei you shi zi, bai fu mei (guo 1 zhang pai or hou shou)

console.log(1- (combination(28, 10)/combination(30, 10)));	// 7 fei you peng peng