var dep = require('./module-dependency');

var kaka = {
	date: dep.getDate()
};

module.exports = function() {
	// console.log(kaka);
	return kaka.date;
};
