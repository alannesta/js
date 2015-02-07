function removeCollection(parent, collection){
	
	return parent.filter(function(item){
		return !contains(collection, item);
	});	
}

function contains(collection, item){
	for (var i = 0, length = collection.length; i< length; i++){
		if (item === collection[i] || JSON.stringify(item) === JSON.stringify(collection[i])){
			return true;
		}
	}
	return false;
}

// var arr = [1,2,3,4,5,6,7];
// var blackList  = [1,4,7];

var arr = [{name: 'kaka'}, {name: 'kala'}, {name: 'kaka'}, {name: 'kaka', age: 15}];
var blackList = [{name: 'kaka'}, {name: 'ka1ka', age: 15}];
// var obj1 = {name: 'kaka'};
// var obj2 = {name: 'kaka'};
// console.log(obj1 === obj2);
// console.log(JSON.stringify(obj1) === JSON.stringify(obj2));

console.log(removeCollection(arr, blackList));