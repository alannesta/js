/*
	Problem: Write a simple function to tell whether 2 is passed as parameter or not?
*/

function checkParam(){
	var args = Array.prototype.slice.call(arguments);
	console.log(args);
	
	for (var i = 0; i<args.length; i++){
		if (args[i] == 2){
			return true;
		}
	}
	return false;

	// Problematic code 
	// args.forEach(function(item, index){
	// 	if (item == 2){
	// 		return true		// !here only the call back function returns true, not the checkParams function
	// 	}
	// })
	// return false
}

console.log(checkParam(1,2,3));