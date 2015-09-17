var currentMessage = '';
var board = function(io) {
    io.of('/board').on('connection', function(socket) {
        updateClient(socket, {
            msg: currentMessage
        });
        // assign the unique id value
        socket.emit('server:assign', socket.id);    // only emit event to the socket itself
        socket.join('sprint1');      // join a specific room
        // what is the socket here?
        socket.on('client:typing', function(data) {
            currentMessage = data.msg;
            //board.emit('server:update', data.msg);        // works, to all in namespace
            //socket.broadcast.emit('server:update', data.msg);   // works, to all in namespace
            //board.in('sprint1').emit('server:update', data.msg);        // only emit to a specific room
            //updateClient(board.in('sprint1'));

            //socket.broadcast.emit('server:update', {
            //    msg: data.msg,
            //    user: data.clientID
            //});

            updateClient(socket.broadcast, {
                user: data.clientID,
                msg: data.msg
            });

        })
    });
};

function updateClient(sockets, data) {
    sockets.emit('server:update', data);
}


/**
 * namespacing connections
 */
//var board = io.of('/board').on('connection', function(socket) {
//    updateClient(socket, {
//        msg: currentMessage
//    });
//    // assign the unique id value
//    socket.emit('server:assign', socket.id);    // only emit event to the socket itself
//    // what is the socket here?
//    socket.on('client:typing', function(data) {
//        currentMessage = data.msg;
//        updateClient(board, {
//            user: data.clientID,
//            msg: data.msg
//        });
//        // what are the differences?
//        //board.emit('server:update', data.msg);        // standard way, to all sockets under '/board'
//        //socket.broadcast.emit('server:update', data.msg);     // this works
//        //io.sockets.emit('server:update', data.msg);     // does not work, not properly namespaced
//        //socket.emit('server:update', data.msg);       // this does not work
//
//        console.log(data.clientID + ' is typing ');
//    })
//});

module.exports = board;