var express = require('express');
var path = require('path');

var app = express();

app.post('/build-rss', function(req, res) {
	console.log(req);
	res.status(200).send();
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.listen(3001);
