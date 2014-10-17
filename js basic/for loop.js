var objArr = [{name: "1", age: 22}, {name: "2", age: 44}, {name: "3", age: 33}, {name: "4", age: 22}]

var obj = {name: "2", age: 44}

//There's no built-in ability to break in forEach. 
objArr.forEach(function(item,index){
	if (item !== obj){
		console.log(index);
		return;			//will not work, still continues the loop. however, the "not found" line will not execute
		//return true;	//will not work
		// break;		//illegal statement;
	}
	console.log("not found");
})

for (var i = 0; i < objArr.length; i++){
	if (objArr[i] !== obj){
		console.log("not equal!");
		// break;		// will jump out of the loop without execute the next function
		// return;		// will jump out of the loop without execute the next function
	}
	console.log("should not print!");
	break;				// break the loop after execute everything in this round
}