var express = require('express');
var router = express.Router();

router.get('/promise', function(req, res) {
	new Promise((resolve, reject) => {
		setTimeout(function() {
			// handled by global promise handler or promise catch block
			//reject('promise rejection');

			// can only be handled by global exception handler
			throw new Error('some exception is thrown');
			res.status(200).send('after promise rejection');
		}, 1000);
	});
});

router.get('/promise2', function(req, res) {
	new Promise((resolve, reject) => {
		setTimeout(function() {
			resolve('yee haa')
		}, 1000);
	}).then(function() {
		return Promise.reject();
	}).catch(function(err) {
		console.log(err);
	});
});

router.get('/promise3', function(req, res) {
	new Promise((resolve, reject) => {
		//JSON.parse("1:1");	// handled by catch block
		reject('some thing went wrong');
	}).catch((err) => {
		console.log('catch error: ', err);
	});
});


router.get('/timeout', function(req, res) {
	setTimeout(function() {
		res.status(200).send('set timeout finished');
		// can only be caught by global error handler, not by express default error handler
		throw new Error('timeout error')
	}, 1000);
});

router.get('/express', function(req, res) {
	// synchronous error will be handled by express default error handler
	JSON.parse("1:1");
});


module.exports = router;
