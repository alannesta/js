var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var async = require('async');

var crawlerService = require('./services/crawler-service');
var dbService = require('./services/db-service');
var miner = require('./services/mining-service');

var logger = require('./utils/logger');

var urlPool = [
	'http://www.91porn.com/v.php?category=hot&viewtype=basic&page=1',
	'http://www.91porn.com/v.php?category=hot&viewtype=basic&page=2',
	'http://www.91porn.com/v.php?category=hot&viewtype=basic&page=3'
];

// for statistic purpose
var crawlStatistic = {
	added: 0,
	updated: 0
};

async.eachSeries(urlPool, fetchVideo, function(err) {
	if (err) {
		logger.error('Main::aynsc series task err -> ', err);
		process.exit(err);
	}
	logger.info('videos updated: ' + crawlStatistic.updated + ', videos added: ' + crawlStatistic.added);
	setTimeout(function() {
		miner.updateTrending(function(err) {
			if (err) {
				console.log(err);
			}
			logger.debug('all done... exiting now');
			process.exit(0);
		});
	}, 1000);
});


function fetchVideo(url, callback) {
	crawlerService.crawl(url).then(function(videos){
		dbService.save(videos, function(err, statistic) {
			if (!err) {
				logger.debug('fetching done for: ' + url);
				crawlStatistic.added += statistic.added;
				crawlStatistic.updated += statistic.updated;
				callback(null);
			}else {
				callback(err);
			}
		});
	});
}



