/*
	get the index of an object in an array of object
*/

var objArr = [{name: "1", age: 22}, {name: "2", age: 44}, {name: "3", age: 33}, {name: "4", age: 22}]

var obj = {name: "2", age: 44}

var anotherobj = {name: "2", age: 44}
console.log(objArr.indexOf(obj));	// -1
console.log(obj == anotherobj);		//false, the two "reference" point to different stuff in memory

anotherobj = obj;
console.log(obj == anotherobj);		//true, now they point to the same thing in memory

// without push it into the array, it will not be found even if they have the same value
for (var i = 0; i < objArr.length; i++){
	if (objArr[i] == obj){
		console.log("obj found at index: " + i);
		// break;		// will jump out of the loop without execute the next function
		return;		// will jump out of the loop without execute the next function
	}

	console.log("round: " + i);
}

// push in the "reference" and now you can found the object in the array
objArr.unshift(obj);

console.log(objArr.indexOf(obj));	// 0

for (var i = 0; i < objArr.length; i++){
	if (objArr[i] == obj){
		console.log("obj found at index: " + i);	// found at index 4
		// break;		// will jump out of the loop without execute the next function
		return;		// will jump out of the loop without execute the next function
	}
	console.log("round: " + i);
}

