console.log('ondemand module code execution, loading subModule dependency');

var subModule = require('./subModule');

function onDemand() {
	subModule();
	console.log('module ondemand function called');
}

module.exports = onDemand;
