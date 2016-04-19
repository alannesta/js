var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var async = require('async');

var crawlerService = require('./services/crawler-service');
var dbService = require('./services/db-service');
var miner = require('./services/mining-service');

var urlPool = [
	'http://www.91porn.com/v.php?category=hot&viewtype=basic&page=1',
	'http://www.91porn.com/v.php?category=hot&viewtype=basic&page=2',
	'http://www.91porn.com/v.php?category=hot&viewtype=basic&page=3'
];

async.eachSeries(urlPool, fetchVideo, function(err) {
	if (err) {
		console.log(err);
		process.exit(err);
	}
	console.log('fetch done, start data mining in 1s...');
	setTimeout(function() {
		miner.updateTrending(function(err) {
			if (err) {
				console.log(err);
			}
			console.log('all done... exit')
			process.exit(0);
		});
	}, 1000);
});


function fetchVideo(url, callback) {
	crawlerService.crawl(url).then(function(videos){
		dbService.save(videos, function(err) {
			if (!err) {
				console.log('fetching done for: ' + url);
				callback(null);
			}else {
				callback(err);
			}
		});
	});
}



