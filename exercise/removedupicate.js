/*
	Problem: Extend the JavaScript Array object by adding a method that removes duplicates.
*/

var arr = [1,1,2,3,3,4,5,5];

Array.prototype.removeDup = function(){
	var newArr = [], that = this;
	that.forEach(function(item, index){
		if (newArr.indexOf(item) == -1){
			newArr.push(item);
		}
	})

	//clear the original value and push unduplicated ones back
	this.splice(0, this.length);
	newArr.forEach(function(item, index){
		that.push(item);
	})
}
arr.removeDup();
console.log(arr);
