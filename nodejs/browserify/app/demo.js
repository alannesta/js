// var process = require('process');
var logger = require('../module/myLogger');

setTimeout(function () {
    console.log('third');
    console.log(logger.logSomething());
}, 0);

process.nextTick(function () {
    console.log('second');
});

console.log('first');