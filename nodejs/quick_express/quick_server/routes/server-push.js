var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
	res.sendFile(path.join(process.cwd(), '/views/server-push.html'));
});

router.get('/endpoint', function(req, res) {
	sendSSE(req, res);
});

function sendSSE(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});

	var id = (new Date()).toLocaleTimeString();

	// Sends a SSE every 5 seconds on a single connection.
	setInterval(function() {
		constructSSE(res, id, (new Date()).toLocaleTimeString());
	}, 5000);

	constructSSE(res, id, (new Date()).toLocaleTimeString());
}

function constructSSE(res, id, data) {
	res.write('id: ' + id + '\n');
	res.write("data: " + data + '\n\n');
}

module.exports = router;