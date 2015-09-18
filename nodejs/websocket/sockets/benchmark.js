var async = require('async');
var language_benchmark = require('fibonacci_benchmark');
var Q = require('q');

var benchmark = function (io) {
    io.of('/benchmark').on('connection', function (socket) {
        socket.on('client:start', function () {

            language_benchmark.setFibo(26);

            var promise = language_benchmark.runBenchmark(function (data) {
                console.log(data);
                socket.emit('server:draw', data);
            });

            Q.when(promise).then(function () {
                socket.emit('server:finish');
            });

            //async.series(jobQueue, function() {
            //    socket.emit('server:finish');
            //});
            //// set up the job queue chain
            //language_benchmark.promiseJobQueue().then(function(result) {
            //    //console.log(result);
            //    socket.emit('server:draw', result);
            //});
            //// get the promise chain trigger and kick start
            //language_benchmark.getTrigger().resolve('start');
        });
    });
};

module.exports = benchmark;