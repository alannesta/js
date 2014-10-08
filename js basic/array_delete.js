/** Problem: */
var arr1 = [1,2,3,4,5,6,7];
var arr2 = [1,2,3,4,5,6,7];
var arr3 = [1,2,3,4,5,6,7];
var index1 = 2, index2 = 4;

arr1.forEach(function(item, index){
	console.log(item+ " "+index);
	if (index == index1 || index == index2){
		// console.log(this);  	// "this" is the global object, not arr
		arr1.splice(index,1);	// the arr will be dynamically changed, do not use splice in a forEach loop!!
	}
})
console.log(arr1);

// from the end to beginning will work
for (var i = arr2.length-1; i>0; i--){
	if (i == index1 || i == index2){
		arr2.splice(i, 1);
	}
}

console.log(arr2);


//delete will only set the value to be undefined
arr3.forEach(function(item, index){
	console.log(item+ " "+index);
	if (index == index1 || index == index2){
		// console.log(this);  	// "this" is the global object, not arr
		delete(arr3[index]);	// the arr will be dynamically changed, do not use splice in a forEach loop!!
	}
})
console.log(arr3);