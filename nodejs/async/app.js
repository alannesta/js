var async = require('async');
var arr = [1, 2, 3, 4, 5, 6];

arr.forEach(function(item) {
    setTimeout(function() {
        console.log(item);
    });
});
console.log('done');    // 'done' will be logged before all the items


/*
 * Async
 *
 */

//async.each(arr, function(item, callback){
//    setTimeout(function(){
//        console.log(item);
//        callback();
//    },500);
//}, function(){
//    console.log('done');      // 'done' is logged at after all the items have been logged
//});
