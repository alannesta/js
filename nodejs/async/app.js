var async = require('async');
var arr = [1, 2, 3, 4, 5, 6];

//arr.forEach(function(item) {
//    setTimeout(function() {
//        console.log(item);
//    });
//});
//console.log('done');    // 'done' will be logged before all the items


/*
 * Async
 *
 */

async.each(arr, iterator.bind(this, cb), function(){
    console.log('done');      // 'done' is logged at after all the items have been logged
});

function iterator() {
    var args = Array.prototype.slice.call(arguments);
    setTimeout(function(){
        console.log(args[1]);   // item looped by forEach is now args 1...
        args[0]();      // the cb which is bound...
    },500);
}

function cb() {
    console.log('callback');
}