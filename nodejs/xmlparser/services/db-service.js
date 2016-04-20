var connection = require('../utils/mysql-connector');
var logger = require('../utils/logger');

var dbService = {
	save: function(metas, callback) {

		var values = generateInsertValues(metas, ['片名', 'url', '时长', '作者', '查看', '收藏', '添加时间', '留言'], [new Date()]);

		var query2 = `INSERT INTO videos (title, url, length, author, view_count, favourite, date_created, comment, last_update)
						VALUES ? ON DUPLICATE KEY
						UPDATE view_count=VALUES(view_count), favourite=VALUES(favourite), comment=VALUES(comment), last_update=VALUES(last_update)`;

		connection.query(query2, [values], function(err, result) {
			if (err) {
				logger.error('SQL ERROR, deService::save: save to videos table ->', err);
				callback(err);
			}
			var parsed = parseQueryResult(result.message);
			var statistics = {
				added: parseInt(parsed[1], 10) - parseInt(parsed[2], 10),
				updated: parseInt(parsed[2], 10)
			};
			if (typeof callback !== 'undefined') {
				callback(err, statistics);
			}
		});
	}
};

function generateInsertValues(objects, keys, extra) {
	var items = [];
	objects.forEach(function(object) {
		var entry = [];
		var result = [];
		keys.forEach(function(key) {
			entry.push(object[key]);
			//TODO: pretty redundant here, need to debug
			if (extra && extra instanceof Array && extra.length > 0) {
				result = entry.concat(extra);
			}else {
				result = entry;
			}
		});
		items.push(result);
	});
	return items;
}

function parseQueryResult(message) {
	var regx = /Records:\s*(\d+)\s*Duplicates:\s*(\d+)/;
	return regx.exec(message);
}


module.exports = dbService;
