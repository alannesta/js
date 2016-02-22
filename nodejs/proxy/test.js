const https = require('https');
const fs = require('fs');
const options = {
	key: fs.readFileSync('./certificate/private.pem'),
	cert: fs.readFileSync('./certificate/public.pem')
};

https.createServer(options, (req, res) => {
	res.writeHead(200);
	res.end('hello world\n');
}).listen(8000);
