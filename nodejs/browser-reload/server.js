var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var Server = require('socket.io');

var currentMessage = '';

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
    updateClient(socket);
    // assign the unique id value
    socket.emit('server:assign', socket.id);    // only emit event to the socket itself
    // what is the socket here?
    socket.on('client:typing', function(data) {
        currentMessage = data.msg;
        updateClient(board);
        // what are the differences?
        //board.emit('server:update', data.msg);        // standard way, to all sockets under '/board'
        //socket.broadcast.emit('server:update', data.msg);     // this works
        //io.sockets.emit('server:update', data.msg);     // does not work, not properly namespaced
        //socket.emit('server:update', data.msg);       // this does not work

        console.log(data.clientID + ' is typing ');
    })
});

/*
* Using rooms
*
* */
//var board = io.of('/board').on('connection', function(socket) {
//    updateClient(socket);
//    // assign the unique id value
//    socket.emit('server:assign', socket.id);    // only emit event to the socket itself
//    socket.join('sprint1');      // join a specific room
//    // what is the socket here?
//    socket.on('client:typing', function(data) {
//        currentMessage = data.msg;
//        //board.emit('server:update', data.msg);        // works, to all in namespace
//        //socket.broadcast.emit('server:update', data.msg);   // works, to all in namespace
//        //board.in('sprint1').emit('server:update', data.msg);        // only emit to a specific room
//        updateClient(board.in('sprint1'));
//    })
//});

/**
 *
 * @param socket.io Namespace object
 */
function updateClient(sockets) {
    sockets.emit('server:update', currentMessage);
}

http.listen(3000, function(){
    console.log('listening on *:3000');
});