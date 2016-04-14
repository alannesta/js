var htmlparser = require("htmlparser2");
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var crawlerService = require('./services/crawler-service');

//var htmlStr = fs.readFileSync('./91pp1.html', {
//	encoding: 'utf8'
//});
var j = request.jar();
var cookie = request.cookie('language=cn_CN');
//var url = 'http://www.91porn.com/v.php?category=top&viewtype=basic';
var url = 'http://www.91porn.com/v.php?category=top&m=-1&viewtype=basic';
j.setCookie(cookie, url);

request({
	url: url,
	jar: j
}, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		//console.log(body); // Show the HTML for the Google homepage.
		var metaPayload = parseHtml(body);
		//crawlerService.save(metaPayload);
	}
});

var resultSet = [];

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
						entry[node.children[0].data.replace(':', '')] = processTime(sanitize(node.next.data));
					} else {
						entry[node.children[0].data.replace(':', '')] = sanitize(node.next.data);
					}
				}

				if(node.type == 'tag' && node.name == 'a' && node.attribs.title != undefined) {
					//console.log('片名: ---> ' + node.attribs.title);
					//console.log('url: ---> ' + node.attribs.href);
					entry['片名'] = node.attribs.title;
					entry['url'] = node.attribs.href;
				}
			});
			resultSet.push(entry);
		} catch(err) {
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

function processTime(timeStr) {
	var HOUR = '小时';
	var DAY = '天';
	var regx = /^(\d{1,2}).*/;
	var result = regx.exec(timeStr);
	//console.log('parsed digit: ' + result[1]);
	//console.log(timeStr.indexOf(HOUR));

	if (timeStr.indexOf(HOUR) > -1) {
		return parseInt(result[1], 10);
	}
	if (timeStr.indexOf(DAY) > -1) {
		return parseInt(result[1], 10)*24;
	}
}

function trending(viewCount, time) {
	try {
		return (parseInt(viewCount, 10)/parseInt(time, 10)).toFixed(2);
	}catch(err) {
		console.log(err);
	}
}

