'use strict';

function* idMaker(){
	let index = 0;
	while(index < 10)
		yield index++;
}

// test in node
//let iterator = idMaker();
//console.log(iterator.next().value);
//console.log(iterator.next().value);
//console.log(iterator.next().value);
//console.log(iterator.next().value);

export default idMaker;
