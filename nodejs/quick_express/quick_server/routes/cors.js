var express = require('express');
var router = express.Router();

router.post('/set-cookie', function(req, res) {
	console.log('cors request received');
	const cookieConfig = {expires: new Date(Date.now() + 10000000)};
	res.cookie('ckey', 'cvalue', cookieConfig);
	res.status(200).json({
		key: 'value'
	});
});

module.exports = router;