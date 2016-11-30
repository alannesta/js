var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
//var rawParser = require('body-parser').raw();

router.get('/', function(req, res) {
	// without using the jade engine
	res.sendFile(path.join(process.cwd(), '/views/upload.html'));

});

// handle pure blob/file binary upload
router.post('/upload', function(req, res) {

	// #1 stream pipeline
	var writable = fs.createWriteStream('/Users/alancao/Desktop/' + req.query.name);
	req.pipe(writable);

	req.on('end', function() {
		writable.close();	// is this needed?
		res.status(200).send('done');

	});

	// #2 keep all buffer/chunks in memory, write once

	var body = [];
	console.log(req.body);
	req.on('data', function(chunk) {
		body.push(chunk);
	}).on('end', function() {
		// chunks are already buffers, just need to concat
		var buffer = Buffer.concat(body);
		console.log(buffer);

		fs.writeFile('/Users/alancao/Desktop/' + req.query.name, buffer, function(err){
			if (err) {
				console.log(err);
			}
			res.status(200).send('done');
		});

		//fs.write(fd, buffer, function(err, written, buffer) {
		//	if (err) {
		//		console.log('err: ' + err);
		//	}
		//	console.log(written);
		//	console.log(buffer);
		//	res.send(200);
		//});
	}).on('error', function(err) {
		console.log(err);
	});
});

module.exports = router;
