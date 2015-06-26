//to enable global.gc(), run node with option: node --expose-gc mem-usage.js

var util = require('util');

console.log(util.inspect(process.memoryUsage()));

var hugeObj  = {};

for (var i = 0; i < 1000000; i++) {
    hugeObj['key' + i] = 'value' +i ;
}

console.log(util.inspect(process.memoryUsage()));

hugeObj = null;

console.log(util.inspect(process.memoryUsage()));

global.gc();

console.log(util.inspect(process.memoryUsage()));

setInterval(function() {
    console.log(util.inspect(process.memoryUsage()));
}, 2000);
