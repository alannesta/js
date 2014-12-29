var myModule = (function(){
	function logSomething(){
		console.log('my logger included');
	}
	return {
		logSomething: logSomething
	}
}());

module.exports = myModule;