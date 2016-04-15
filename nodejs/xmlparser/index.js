var htmlparser = require("htmlparser2");
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var crawlerService = require('./services/crawler-service');

var htmlStr = fs.readFileSync('./91pp1.html', {
	encoding: 'utf8'
});
var resultSet = [];

//local payload
var meta = parseHtml(htmlStr);
crawlerService.save(meta, function() {
});

//var j = request.jar();
//var cookie = request.cookie('language=cn_CN');
////var url = 'http://www.91porn.com/v.php?category=top&viewtype=basic';
//var url = 'http://www.91porn.com/v.php?category=top&m=-1&viewtype=basic';
//j.setCookie(cookie, url);
//
//request({
//	url: url,
//	jar: j
//}, function (error, response, body) {
//	if (!error && response.statusCode == 200) {
//		//console.log(body); // Show the HTML for the Google homepage.
//		var metaPayload = parseHtml(body);
//		crawlerService.save(metaPayload, function(){});
//	}
//});


function parseHtml(str) {
	var $ = cheerio.load(str);
	var tiles = $('.listchannel');

	Object.keys(tiles).forEach(function(key) {
		try {
			parseInt(key, 10);	// check key
			var entry = {};
			tiles[key].children.forEach(function(node) {
				if (node.type == 'tag' && node.name == 'span') {
					if (node.children[0].data == '作者:') {
						//console.log(node.children[0].data + ' ---> ' + node.next.next.children[0].data);
						entry[node.children[0].data.replace(':', '')] = sanitize(node.next.next.children[0].data);
					} else if (node.children[0].data == '添加时间:') {
						//console.log(node.children[0].data + ' ---> ' + node.next.data);
						entry[node.children[0].data.replace(':', '')] = processAddedDate(sanitize(node.next.data));
					} else if (node.children[0].data == '时长:') {
						entry[node.children[0].data.replace(':', '')] = processLength(sanitize(node.next.data));
					} else {
						entry[node.children[0].data.replace(':', '')] = sanitize(node.next.data);
					}
				}

				if (node.type == 'tag' && node.name == 'a' && node.attribs.title != undefined) {
					//console.log('片名: ---> ' + node.attribs.title);
					//console.log('url: ---> ' + node.attribs.href);
					entry['片名'] = node.attribs.title;
					entry['url'] = node.attribs.href;
				}
			});
			// another level of data check
			if (entry['url'] && entry['url']) {
				resultSet.push(entry);
			}
		} catch (err) {
			console.log(err);
			//console.log(key + ' is not a valid entry');
		}
	});

	//not the time to get the trending yet
	//resultSet.forEach(function(entry) {
	//	entry.trend = trending(entry['查看'], entry['添加时间']);
	//});

	console.log(resultSet);
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
	//console.log('now: ' + now);
	//console.log('parsed digit: ' + result[1]);
	//console.log(timeStr.indexOf(HOUR));
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

//console.log(processAddedDate('2年'));

/**
 Process the length of the video
 */

function processLength(length) {
	//var regx = /^(\d{2}):(\d{2})$/;
	var regx2 = /(\d{1,2}):(\d{2}):*(\d{2})*/;
	//var result = regx.exec(length);
	var result = length.match(regx2);
	console.log(result);
	if (typeof result[1] !== 'undefined' && typeof result[2] !== 'undefined') {
		if (typeof result[3] !== 'undefined') {
			return parseInt(result[1], 10) * 60 + parseInt(result[2], 10) + parseFloat((parseInt(result[3], 10) / 60).toFixed(2));
		} else {
			console.log(parseInt(result[1], 10));
			return parseInt(result[1], 10) + parseFloat((parseInt(result[2], 10) / 60).toFixed(2));
		}
	} else {
		throw new Error('video length format wrong: ' + length);
	}
}

//console.log(processLength('00:00:00'));
//console.log(parseInt('02', 10));


function trending(viewCount, time) {
	try {
		return (parseInt(viewCount, 10) / parseInt(time, 10)).toFixed(2);
	} catch (err) {
		console.log(err);
	}
}

