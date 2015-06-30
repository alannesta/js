var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var Server = require('socket.io');

var io = new Server(31203);

//app.get('/', function(req, res){
//    res.sendFile(__dirname + '/static/app.html');
//});

app.use(express.static('static'));

io.on('connection', function(socket){
    console.log('new connection');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});