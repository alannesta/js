var express = require('express');
var app = express();

var liveReloadPort = 12722;

var server = {
    create: function() {
        // connect-livereload will inject the script
        app.use(require('connect-livereload')({
            port: liveReloadPort
        }));
        app.use(express.static('dist'));

        app.listen(3000, function() {
            console.log('server started...');
        });
    }
};

module.exports = server;
