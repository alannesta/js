'use strict';
const str1 = `1
			2`;

const str2 = '卡部';

//printCharCode(str1);
console.log('-----------------');
printCharCode(str2);

function printCharCode(str) {
	for (let i = 0; i < str.length; i++) {
		console.log(str.codePointAt(i));
	}
}

//console.log(str1.length);
console.log(str2.length);