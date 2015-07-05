var socket = io('http://localhost:31203/board');    // name space the socket connection

var clientID;

$('#dashboard').on('keyup', function () {
    socket.emit('client:typing', {
            msg: $('#dashboard').val(),
            clientID: clientID
        }
    );
    return false;
});

socket.on('server:update', function (data) {
    $('#dashboard').val(data.msg);
    if (data.user !== undefined) {
        $('#hint').show();
        $('#hint').text(data.user + ' is typing...');
    }
});

socket.on('server:assign', function(id) {
    clientID = id;
});

setInterval(function() {
    $('#hint').hide();
}, 1000);