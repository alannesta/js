console.log('module1 code execution');
var module2 = require('./module2_bundler');

function module1() {
	module2();
	console.log('module1 function call');
};

export default module1;
