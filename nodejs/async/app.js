var async = require('async');
var Fiber = require('fibers');
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

//async.each(arr, iterator.bind(this, cb), function(){
//    console.log('all done');      // 'done' is logged at after all the items have been logged
//});
//
//function iterator() {
//    var args = Array.prototype.slice.call(arguments);
//    setTimeout(function(){
//        console.log(args[1]);   // item looped by forEach is now args 1...
//        args[0]();      // the cb which is bound...
//    },500);
//}
//
//function cb() {
//    console.log('binded callback');
//}

async.series({
        one: function (callback) {
            var total = 0;
            async.each(arr, function(item, cb){
                setTimeout(function() {
                    total = total + item;
                    cb(null);
                }, 1000);

            }, callback.bind(undefined, null, total));
            //arr.forEach(function(item) {
            //   total = total + item;
            //});
            //callback(null, total);
        },
        two: function (callback) {
            setTimeout(function () {
                callback(null, 2);
            }, 100);
        }
    },
    function (err, results) {
        // results is now equal to: {one: 1, two: 2}
        console.log(results);
    });


/*
 * Fibers
 *
 */

//function sleep(ms) {
//    var fiber = Fiber.current;
//
//    setTimeout(function () {
//        fiber.run();
//    }, ms);
//
//    Fiber.yield();
//}
//
//Fiber(function () {
//    console.log('wait... ' + new Date);
//    sleep(1000);
//    console.log('ok... ' + new Date);
//}).run();
//
//console.log('back in main');