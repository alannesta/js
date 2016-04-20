var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var q = require('q');
var logger = require('../utils/logger');

var CrawlerService = {
	crawl: function(url) {
		var deferred = q.defer();
		var j = request.jar();
		var cookie = request.cookie('language=cn_CN');
		j.setCookie(cookie, url);

		request({
			url: url,
			jar: j
		}, function (error, response, body) {
			if (error) {
				deferred.reject();
			}
			if (!error && response.statusCode == 200) {
				deferred.resolve(parseHtml(body));
			}
		});

		return deferred.promise;
	}
};


function requestPage(url, callback) {

	var j = request.jar();
	var cookie = request.cookie('language=cn_CN');
	j.setCookie(cookie, url);

	request({
		url: url,
		jar: j
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(parseHtml(body));
		}
	});
}


/**
 * Parser for the html fetched
 * @param str
 * @returns {Array}
 */
function parseHtml(str) {
	var resultSet = [];
	var $ = cheerio.load(str);
	var tiles = $('.listchannel');

	Object.keys(tiles).forEach(function(key) {
		try {
			parseInt(key, 10);	// check key
			var entry = {};
			tiles[key].children.forEach(function(node) {
				if (node.type == 'tag' && node.name == 'span') {
					if (node.children[0].data == '作者:') {
						entry[node.children[0].data.replace(':', '')] = sanitize(node.next.next.children[0].data);
					} else if (node.children[0].data == '添加时间:') {
						entry[node.children[0].data.replace(':', '')] = processAddedDate(sanitize(node.next.data));
					} else if (node.children[0].data == '时长:') {
						entry[node.children[0].data.replace(':', '')] = processLength(sanitize(node.next.data));
					} else {
						entry[node.children[0].data.replace(':', '')] = sanitize(node.next.data);
					}
				}

				if (node.type == 'tag' && node.name == 'a' && node.attribs.title != undefined) {
					entry['片名'] = node.attribs.title;
					entry['url'] = node.attribs.href;
				}
			});
			// another level of data check
			if (entry['url'] && entry['时长'] > 2) {
				resultSet.push(entry);
			}
		} catch (err) {
			logger.debug('CrawlerService::parseHtml: try-catch Error -> ' + err);
		}
	});
	//console.log(resultSet);
	return resultSet;
}


function sanitize(str) {
	return str.trim();
}

/**
 Process the time when the video is added
 */
function processAddedDate(timeStr) {
	var now = Date.now();	// unix timestamp in millisecond
	var HOUR = '小时';
	var DAY = '天';
	var YEAR = '年';
	var regx = /^(\d{1,2}).*/;
	var HOURTOMILLISECONDS = 3600000;

	var result = regx.exec(timeStr);
	if (typeof result[1] !== 'undefined') {
		if (timeStr.indexOf(HOUR) > -1) {
			return new Date(now - HOURTOMILLISECONDS * parseInt(result[1], 10));
		}
		if (timeStr.indexOf(DAY) > -1) {
			return new Date(now - 24 * HOURTOMILLISECONDS * parseInt(result[1], 10));
		}
		if (timeStr.indexOf(YEAR) > -1) {
			return new Date(now - 365 * 24 * HOURTOMILLISECONDS * parseInt(result[1], 10));
		}
	}else {
		throw new Error('added date not processed correctly: ' + timeStr);
	}
}

/**
 Process the length of the video
 */

function processLength(length) {
	var regx2 = /(\d{1,2}):(\d{2}):*(\d{2})*/;
	var result = length.match(regx2);
	var timeinminute = 0;
	if (typeof result[1] !== 'undefined' && typeof result[2] !== 'undefined') {
		if (typeof result[3] !== 'undefined') {
			timeinminute = parseInt(result[1], 10) * 60 + parseInt(result[2], 10) + parseFloat((parseInt(result[3], 10) / 60).toFixed(2));
		} else {
			timeinminute = parseInt(result[1], 10) + parseFloat((parseInt(result[2], 10) / 60).toFixed(2));
		}
		//if (timeinminute > 2) {
		//	return timeinminute;
		//}else {
		//	throw new Error('video length too short, ignore');
		//}
		return timeinminute;
	} else {
		throw new Error('video length format wrong: ' + length);
	}
}

module.exports = CrawlerService;