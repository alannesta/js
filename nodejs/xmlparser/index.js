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
	'http://www.91porn.com/v.php?category=hot&viewtype=basic&page=3',
	'http://www.91porn.com/v.php?category=hot&viewtype=basic&page=4'
];

//async.eachSeries(urlPool, fetchVideo, function(err) {
//	if (err) {
//		console.log(err);
//		process.exit(err);
//	}
//	console.log('all done!');
//	process.exit(0);
//});

miner.updateTrending();

function fetchVideo(url, callback) {
	crawlerService.crawl(url).then(function(videos){
		dbService.save(videos, function(err) {
			if (!err) {
				console.log('task done: ' + url);
				callback(null);
			}else {
				callback(err);
			}
		});
	});
}



