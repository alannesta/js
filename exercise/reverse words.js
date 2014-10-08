/*
	reverse the words in a sentence
*/
var str = "adasd dadasda ;adsdad asd a-dsdsa,sdas";
var arr = str.split(/[^\w]+/);
// console.log(arr);
arr.reverse();
var result = arr.join(',');
console.log(result);