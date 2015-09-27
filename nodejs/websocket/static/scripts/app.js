var socket = io(window.location.origin + '/board');
var $ = require('jquery');

$('#hellows').click(function () {
    socket.emit('chat message', $('#message').val());
    $('#message').val('');
    return false;
});

$('#reload').click(function() {
    socket.emit('reload request');
});

socket.on('chat message', function (msg) {
    $('#messages').append($('<li>').text(msg));
});

socket.on('reload allowed', function() {
    window.document.location.href = 'http://localhost:3000';
});