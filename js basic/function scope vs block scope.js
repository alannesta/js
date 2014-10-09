var arr = [1,2,3,4,5]
function test(){

	for (var i = 0, length = arr.length; i < length; i++){
		// console.log("do something");
	}
	console.log("i is now: " + i);	// 5
	console.log("length is : " + length);	//5 there is no block scope for length
	for (var i = 0; i<10; i++){	// can redeclair the ;
		console.log(i);
	}
	console.log("i is now: "+i)
}

console.log("i is now: " + i);	//undefined, there is the function scope for i

test();

for (var i = 5; i < 10; i++){
	// console.log("do nothing");
}
console.log("i is now: " + i);	// 5, there is no block scope for i

for (; i<15; i++){		// can still get the value of i (i = 10);
	console.log(i);
}