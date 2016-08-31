console.log('submodule module will be loaded when onDemand module requires it');

function submodule() {
	console.log('submodule function called');
}

module.exports = submodule;
