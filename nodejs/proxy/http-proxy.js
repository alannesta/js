var http = require('http');
var net = require('net');
var url = require('url');

function request(cReq, cRes) {
	var u = url.parse(cReq.url);

	var options = {
		hostname: u.hostname,
		port: u.port || 80,
		path: u.path,
		method: cReq.method,
		headers: cReq.headers
	};

	var pReq = http.request(options, function(pRes) {
		//console.log(pRes);
		cRes.writeHead(pRes.statusCode, pRes.headers);
		pRes.pipe(cRes);
	}).on('error', function(e) {
		cRes.end();
	});

	cReq.pipe(pReq);
}

var server = http.createServer(request);

server.on('connection', function(socket) {

	console.log('connected -->', socket.address());
});

//server.on('request', request);

server.listen(8888);