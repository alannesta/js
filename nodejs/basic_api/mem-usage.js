//to enable global.gc(), run node with option: node --expose-gc mem-usage.js

var util = require('util');

var hugeObj  = {};

console.log(util.inspect(process.memoryUsage()));

for (var i = 0; i < 1000000; i++) {
    hugeObj['key' + i] = 'value' +i ;
}

function destroy_obj_fake(obj) {
    obj = null;
}

destroy_obj_fake(hugeObj);  // this will not destroy the hugeObj, the passed in 'copy' of reference is pointing to null, the object still persist
//hugeObj = null;     // the correct way to destroy

global.gc();

console.log(util.inspect(process.memoryUsage()));

//setInterval(function() {
//    console.log(util.inspect(process.memoryUsage()));
//}, 2000);
