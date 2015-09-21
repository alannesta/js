//var socket = io('http://localhost:31203/board');    // name space the socket connection
var socket = io(window.location.origin + '/board');

var clientID;
var timeout;

$('#dashboard').on('keyup', function () {
    socket.emit('client:typing', {
            msg: $('#dashboard').val(),
            clientID: clientID
        }
    );
    return false;
});

socket.on('server:update', function (data) {
    clearTimeout(timeout);
    $('#dashboard').val(data.msg);
    if (data.user !== undefined) {
        $('#hint').show();
        $('#hint').text(data.user + ' is typing...');
    }
    timeout = setTimeout(function() {
        $('#hint').hide();
    }, 1000);
});

socket.on('server:assign', function(id) {
    clientID = id;
});