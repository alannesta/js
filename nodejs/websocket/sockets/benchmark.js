var async = require('async');
var language_benchmark = require('../lib/benchmark');

var benchmark = function(io) {
    io.of('/benchmark').on('connection', function(socket) {
        socket.on('client:start', function() {
            var jobQueue = language_benchmark.asyncTaskChain(function(data) {
                console.log(data);
                socket.emit('server:draw', data);
            });

            async.series(jobQueue, function() {
                socket.emit('server:finish');
            });
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