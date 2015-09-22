var express = require('express');
var app = express();
var httpServer = require('http').Server(app);
var Socket = require('socket.io');
var io = new Socket(httpServer);     // spawn the websocket server using the same port as the http server

var config = require('./config');
//var language_benchmark = require('./lib/benchmark');
//var async = require('async');
var benchmarkSocketConfig = require('./sockets/benchmark');
var boardSocketConfig = require('./sockets/board');
console.log('node env...' + process.env.NODE_ENV);

app.use(express.static('static'));
app.set('view engine', 'jade');
app.set('views', './static');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/static/app.html');
});

app.get('/board', function(req, res){

    if (process.env.NODE_ENV === 'production') {
        res.sendFile(__dirname + '/static/board.html');
    }else {
        res.render('board', {
            socketioClient: 'https://cdn.socket.io/socket.io-1.3.5.js'
        });
    }
});

app.get('/reload', function() {
    io.emit('reload allowed');
});

app.get('/benchmark', function(req, res) {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(__dirname + '/static/benchmark.html');
    } else {
        res.render('benchmark', {
            socketioClient: 'https://cdn.socket.io/socket.io-1.3.5.js'
        });
    }
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

httpServer.listen(process.env.PORT || 3000, function(){
    console.log('listening on *:' + (process.env.PORT || 3000));
});
