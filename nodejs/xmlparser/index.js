var htmlparser = require("htmlparser2");
var fs = require('fs');
var cheerio = require('cheerio');

var htmlStr = fs.readFileSync('./91pp1.html', {
	encoding: 'utf8'
});

var $ = cheerio.load(htmlStr);

var tiles = $('.listchannel');
var resultSet = [];

Object.keys(tiles).forEach(function(key) {
	//console.log(tiles[key]);
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

console.log('-----------  Result -----------------------');
console.log(resultSet);

function sanitize(str) {
	return str.trim();
}

function processTime(timeStr) {
	var HOUR = '小时前';
	var DAY = '天前';

	var regx = /^(\d{1,2}).*/;
	var result = regx.exec(timeStr);
	//console.log('parsed digit: ' + result[1]);
	if (timeStr.indexOf(HOUR) > -1) {
		console.log(parseInt(result[1], 10));
		return parseInt(result[1], 10);
	}
	if (timeStr.indexOf(DAY) > -1) {
		console.log(parseInt(result[1], 10)*24);
		return parseInt(result[1], 10)*24;
	}
}

//$('.listchannel')['0'].children.forEach(function(node){
//	//if(node.type=='tag' && node.name=='span') {
//	//	if (node.children[0].data == '作者:') {
//	//		console.log(node.children[0].data + ' ---> ' + node.next.next.children[0].data);
//	//	}else {
//	//		console.log(node.children[0].data + ' ---> ' + node.next.data);
//	//	}
//	//}
//	if(node.type == 'tag' && node.name == 'a' && node.attribs.title != undefined) {
//		console.log(node.attribs.title);
//	}
//
//});

