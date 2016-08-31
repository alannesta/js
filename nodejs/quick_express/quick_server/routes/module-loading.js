var express = require('express');
var router = express.Router();
var util = require('util');
// node require
var kaka = require('../lib/kakaGenerator')();
var getKaka = require('../lib/kakaGenerator');

router.get('/', function(req, res) {
	res.render('module loading');

});

router.get('/testrequire', function(req, res) {
	console.log('kaka by value: ' + kaka);	// will always be the same (from require cache)
	console.log('kaka by function call:' + getKaka());	// getKaka is a reference for the function, will retrive latest kaka value via closure
	var onDemand = require('../lib/onDemandModule');	// the module will be loaded at the time it is required
	onDemand();
	res.send('123');
});

module.exports = router;
