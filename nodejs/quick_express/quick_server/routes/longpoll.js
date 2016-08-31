var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var stream = require('stream');
var util = require('util');
var asyncError = require('../lib/asyncError');


function StringifyStream() {
	stream.Transform.call(this);

	this._readableState.objectMode = false;
	this._writableState.objectMode = true;
}
util.inherits(StringifyStream, stream.Transform);

StringifyStream.prototype._transform = function(obj, encoding, cb) {
	this.push(JSON.stringify(obj));
	cb();
};


router.get('/', function(req, res) {
	res.render('polling');

});

router.get('/long', function(req, res, next) {
	asyncError(next);
	res.send('ok');
});

router.get('/stream', function(req, res) {
	fs.createReadStream(path.join(__dirname, '../public/bower-components/jquery/dist/jquery.js'), {
		encoding: 'utf8',
		autoClose: true
	}).pipe(res);     // response header would be: Transfer-Encoding: chunked
});

router.get('/manual-stream', function(req, res) {
	var i = 0;
	var rs = new stream.Readable({objectMode: true});
	rs._read = function() {};

	// way 1
	rs.pipe(res);

	// way 2
	//rs.on('data', function(data) {
	//    res.write(data);
	//});
	//
	//rs.on('end', function() {
	//    res.status(200).end();
	//});

	var interval = setInterval(function() {
		if (i < 5) {
			// overflow the buffer to force a res flush
			for (var j = 0; j < 2000; j++) {
				rs.push('str' + j);
			}
			i++;
		} else {
			clearInterval(interval);
			rs.push(null);
		}
	}, 1000);
});

module.exports = router;
