var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./routes/index');
var polling = require('./routes/longpoll');
var scriptLoading = require('./routes/script-loading');
var moduleLoading = require('./routes/module-loading');
// var upload = require('./routes/file-upload');
var serverPush = require('./routes/server-push');
var analytics = require('./routes/kinesis');
var corsTest = require('./routes/cors');
var errorHandling = require('./routes/error-handling');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
	origin: 'http://local.dev.com:8080',
	credentials: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/polling', polling);
app.use('/script-loading', scriptLoading);
app.use('/module-loading', moduleLoading);
// app.use('/file-upload', upload);
app.use('/server-push', serverPush);
app.use('/kinesis', analytics);
app.use('/cors', corsTest);
app.use('/error-handling', errorHandling);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

process.on('uncaughtException', (err) => {
	console.log('get Uncaught exception: ', err);
});

process.on('unhandledRejection', (reason, p) => {
	console.log('get Unhandled Rejection at:', p, 'reason:', reason);
});

app.listen(3005, function() {
    console.log('app listening @3005');
});

module.exports = app;
