var kaka = 1;

console.log('module kaka required');

setInterval(function() {
	kaka += 1;
}, 2000);

function getKaka() {
	console.log('module getter function called');
	return kaka;
}

module.exports = getKaka;
