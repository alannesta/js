var http = require('http');
var https = require('https');
var fs = require('fs');
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
		cRes.writeHead(pRes.statusCode, pRes.headers);
		pRes.pipe(cRes);	// pRes here in http.IncomingMessage rather than http.serverResponse, it is a readable stream
	}).on('error', function(err) {
		console.log(err);
		cRes.end();
	});

	cReq.pipe(pReq);	// cReq here is http.IncomingMessage rather than http.clientRequest, a readable stream not a writable stream
}

function connect(cReq, cSock) {
	var u = url.parse('http://' + cReq.url);

	var pSock = net.connect(u.port, u.hostname, function() {
		cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
		pSock.pipe(cSock);
	}).on('error', function(e) {
		cSock.end();
	});

	cSock.pipe(pSock);
}

var options = {
	key: fs.readFileSync('./certificate/private.pem'),
	cert: fs.readFileSync('./certificate/public.pem')
};


var server = https.createServer(options, request);
//server.on('request', request);
server.on('connect', connect);
server.on('connection', function() {
	//console.log('wtf');
});
server.listen(8888);
