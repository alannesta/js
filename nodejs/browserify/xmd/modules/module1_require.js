define(['./module2_require'], function(module2) {
	return function() {
		module2();
		console.log('module1 execute');
	};
});
