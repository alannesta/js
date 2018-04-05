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

router.get('/await', function(req, res) {
	const result = add1(10).catch(err => {
		// catch synchronous errors and promise rejection
		console.log('catch exception/rejection: ', err);
	});

	res.status(200).send(result)
});

function resolveAfter2Seconds(x) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			//resolve(x);
			reject('something went wrong');
			//throw new Error('something went wrong')
		}, 2000);

	});
}

async function add1(x) {
	let a = 0;
	let b = 0;
	try {
		a = await resolveAfter2Seconds(20);
		b = await resolveAfter2Seconds(30);
	} catch(err) {
		// will catch promise rejection, but not async exception in setTimeout
		console.log(err);
	}
	
	throw new Error('add function error');

	return x + a + b;
}

module.exports = router;
