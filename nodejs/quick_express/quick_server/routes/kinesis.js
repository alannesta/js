var express = require('express');
var router = express.Router();
var cors = require('cors');
var path = require('path');

var corsOptions = {
	origin: 'http://localhost:8080',
	optionsSuccessStatus: 200,
	credentials: true
};

router.use(cors(corsOptions));

router.options('*', cors(corsOptions));

router.get('/', function(req, res) {
	res.sendFile(path.join(process.cwd(), '/views/kinesis-cors.html'));
});

router.put('/analytics/v1/put-record', cors(corsOptions), function(req, res) {
	res.status(200).send('done');
});

module.exports = router;
