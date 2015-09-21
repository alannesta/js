var async = require('async');
var language_benchmark = require('fibonacci_benchmark');
var Q = require('q');
var fs = require('fs');
var dropbox = require('../modules/dropbox');

var benchmark = function (io) {
    io.of('/benchmark').on('connection', function (socket) {
        socket.on('client:start', function () {

            language_benchmark.setFibo(32);

            var promise = language_benchmark.runBenchmark(function (data) {
                console.log(data);
                socket.emit('server:draw', data);
            });

            promise.then(function () {
                // handle chart.js animation delay, or set animation: false
                setTimeout(function() {
                    socket.emit('server:report');
                },3000);
            });
        });

        socket.on('client:report', function (data) {
            var base64Data = data.replace(/^data:image\/png;base64,/, "");
            //fs.writeFile("./results/report.png", base64Data, 'base64', function(err) {
            //    console.log(err);
            //    dropbox.upload(fs.readFileSync('./results/report.png'));
            //});
            dropbox.uploadBase64(base64Data);
        });
    });
};

module.exports = benchmark;