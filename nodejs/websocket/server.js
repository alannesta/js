var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var Server = require('socket.io');
var config = require('./config');
//var language_benchmark = require('./lib/benchmark');
//var async = require('async');
var benchmarkSocketConfig = require('./sockets/benchmark');
var boardSocketConfig = require('./sockets/board');

var io = new Server(config.websocketPort);     // create the socket.io(websocket) server on a custom port

app.use(express.static('static'));
app.set('view engine', 'jade');
app.set('views', './static');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/static/app.html');
});

app.get('/board', function(req, res){
    res.render('board', {
        socketioClient: 'http://' + config.localhost + ':' + config.websocketPort + '/socket.io/socket.io.js'
    });
});

app.get('/reload', function() {
    io.emit('reload allowed');
});

app.get('/benchmark', function(req, res) {
    res.render('benchmark', {
        socketioClient: 'http://' + config.localhost + ':' + config.websocketPort + '/socket.io/socket.io.js'
    });
});

io.on('connection', function(socket){
    /*
    * live reload feature
    * */
    //console.log('new connection: ',socket);
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on('reload request', function() {
       io.emit('reload allowed');
    });

    socket.on('server:update', function() {
       console.log('global namespace receive ---> server:update');
    });
});

boardSocketConfig(io);
benchmarkSocketConfig(io);

http.listen(3000, function(){
    console.log('listening on *:3000');
});
