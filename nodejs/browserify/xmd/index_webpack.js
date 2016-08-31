// var module1 = require('./modules/module1_bundler');
console.log('before import');
import module1 from './modules/module1_bundler';
import {onClickModule} from './modules/onClickModule_bundler';
var onClickModule2 = require('./modules/onClickModule_bundler');

document.getElementById('loadModule').addEventListener('click', function() {
	console.log('button clicked, require onClick module');
	console.log(onClickModule);
	module1();
});
