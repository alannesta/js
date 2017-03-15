/*
	Try while loop when for loop is hard to solve the problem (because for loop re-initiate the index everytime)
	For this problem, the index should be maintained as we merge
*/
var arr2 = [2, 4, 6, 6, 18, 20];
var arr1 = [1, 2, 3, 4, 5, 7, 19];

// var arr2 = [11,22,33];
var merged = [];
var len1 = arr1.length, len2 = arr2.length, i = 0, j = 0;

while(i<len1&&j<len2){
	if (arr1[i]<arr2[j]){
		merged.push(arr1[i]);
		i++;
	}else{
		merged.push(arr2[j]);
		j++;
	}
}
if (i == len1){
	for (var k = j; k<len2; k++){
		merged.push(arr2[k]);
	}
}else{
	for (var k = i; k<len1; k++){
		merged.push(arr1[k]);
	}
}

console.log(merged);
