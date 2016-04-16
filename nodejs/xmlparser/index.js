var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var crawlerService = require('./services/crawler-service');
var dbService = require('./services/db-service');

crawlerService.crawl(function(metas) {
	dbService.save(metas, function(err, result) {
		if (!err) {
			process.exit(0);
		}
	})
});


//function trending(viewCount, time) {
//	try {
//		return (parseInt(viewCount, 10) / parseInt(time, 10)).toFixed(2);
//	} catch (err) {
//		console.log(err);
//	}
//}

