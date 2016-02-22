var http = require('http');
var net = require('net');
var url = require('url');

function request(cReq, cRes) {
	console.log('request');
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

function connect(cReq, cSock) {
	console.log('connect');
	var u = url.parse('http://' + cReq.url);

	var pSock = net.connect(u.port, u.hostname, function() {
		cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
		pSock.pipe(cSock);
	}).on('error', function(e) {
		cSock.end();
	});

	cSock.pipe(pSock);
}


var server = http.createServer(request);

server.on('connect', connect);
server.on('connection', function(socket) {
	//console.log('connected -->', socket.address());
});


server.listen(8888);
