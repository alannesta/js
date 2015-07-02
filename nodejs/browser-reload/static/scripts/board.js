var socket = io('http://localhost:31203');
$('#dashboard').on('keyup', function () {
    socket.emit('typing', $('#dashboard').val());
    return false;
});

socket.on('update', function (msg) {
    $('#dashboard').val(msg);
});