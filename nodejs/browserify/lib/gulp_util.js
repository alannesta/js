var express = require('express');
var app = express();

var server = {
    create: function() {
        app.use(require('connect-livereload')({
            port: 12722
        }));
        app.use(express.static('dist'));

        app.listen(3000, function() {
            console.log('server started...');
        });
    }
};

module.exports = server;
