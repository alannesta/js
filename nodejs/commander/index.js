var program = require('commander');
var doStuff = require('./module-a');

program
	.version('0.0.1')
	.arguments('<chefName>')
	.option('-p, --peppers <pepperName>', 'Add some pepper')
	.action(function(chefName) {
		console.log("Today's chef is " + chefName);
	});


program
	.command('setup')
	.action(function() {
		console.log('setup command execute');
	});

program.parse(process.argv);



if (program.peppers) {
	doStuff(program.peppers);
}