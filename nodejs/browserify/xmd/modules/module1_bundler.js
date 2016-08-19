var module2 = require('./module2_bundler');
module.exports = function() {
	module2();
	console.log('module1 execute');
};
