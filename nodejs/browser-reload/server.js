var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var Server = require('socket.io');

var io = new Server(31203);     // create the socket.io(websocket) server on a custom port

app.use(express.static('static'));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/static/app.html');
});

app.get('/board', function(req, res){
    res.sendFile(__dirname + '/static/board.html');
});

app.get('/reload', function() {
    io.emit('reload allowed');
});

io.on('connection', function(socket){
    //console.log('new connection: ',socket);
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on('reload request', function() {
       io.emit('reload allowed');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});