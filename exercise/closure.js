/*
	Explain what is a closure
*/

/*
	Example 1: populate array with a series of different functions in a for loop
*/

//problematic
function generateFunc(arr){
	var i = 0;
	for (; i < 5; i++){
		arr[i] = function(){
			console.log(i);
		}
	}
	return arr
}
// var myArray = [];
// var result = generateFunc(myArray);
// result[3]();

//fix by using closure which executes/returns a function inside the generate function
function generateFunc2(arr){
	var i = 0;
	for (; i < 5; i++){
		(function(i){
			arr[i] = function(){
				console.log(i);
			}
		})(i);
	}
	return arr
}
// var myArray = [];
// var result = generateFunc2(myArray);
// result[1]();

//another more succinct solution
function createFunction(i){
	return function(){
		console.log("yeehaw: "+i);
	}
}

function generateFunc3(arr){
	var i = 0;
	for (; i < 5; i++){
		arr[i] = createFunction(i)
	}
	return arr
}
// var myArray = [];
// var result = generateFunc3(myArray);
// result[3]();

/*
	Example 2: the classic count down problem
*/

//problematic: the output will always be 0. When the function executes after 1 second, the i has already been changed to 5
function countdown1 (num) {
    for (var i = 0; i < num; i++) {
		setTimeout(function () {
            console.log(num - i);
        }, i * 1000);
    }
}


//solution: 5,4,3,2,1
function countdown2 (num) {
    for (var i = 0; i < num; i++) {
    	(function(k){
    		setTimeout(function () {
	            console.log(num - k);
	        }, k * 1000);
    	})(i);
    }
}

countdown2(5);


/*
	Example 3, the sales will always keep a reference of the "count" from the original function
*/
function SalesCount(){
	var count = 2;
	this.getCount =function(){
		return count;
	}
	return function addCount(){
		count++;
		console.log(count);
	}
}

// var sales = SalesCount();
// sales();
// sales();
// sales();
// sales();


//a better "realife" example to illustrate
function makeKitchen () {
	var trashBags = ['A', 'B', 'C']; // only 3 at first

	return {
		getTrashBag: function() {
			console.log(trashBags.pop());
		}
	}
}

var kitchen = makeKitchen();

kitchen.getTrashBag(); // returns trash bag C
kitchen.getTrashBag(); // returns trash bag B
kitchen.getTrashBag(); // returns trash bag A
