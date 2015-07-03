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
});

/*
* namespacing connections
* */
var board = io.of('/board').on('connection', function(socket) {
    // assign the unique id value
    socket.emit('server:assign', socket.id);    // only emit event to the socket itself
    // what is the socket here?
    socket.on('client:typing', function(data) {
        // what are the differences?
        board.emit('server:update', data.msg);        // standard way, to all sockets under '/board'
        //socket.broadcast.emit('server:update', data.msg);     // this works
        //io.sockets.emit('server:update', data.msg);     // does not work, not properly namespaced
        //socket.emit('server:update', data.msg);       // this does not work

        console.log(data.clientID + ' is typing ');
    })
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});