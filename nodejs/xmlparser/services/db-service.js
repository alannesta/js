var connection = require('../utils/mysql-connector');

var dbService = {
	save: function(metas, callback) {

		var values = generateInsertValues(metas, ['片名', 'url', '时长', '作者', '查看', '收藏', '添加时间', '留言'], [new Date()]);

		var query2 = `INSERT INTO videos (title, url, length, author, view_count, favourite, date_created, comment, last_update)
						VALUES ? ON DUPLICATE KEY
						UPDATE view_count=VALUES(view_count), favourite=VALUES(favourite), comment=VALUES(comment), last_update=VALUES(last_update)`;

		connection.query(query2, [values], function(err, result) {
			if (err) {
				console.log(err);
				callback(err);
			}
			//console.log(result);
			if (typeof callback !== 'undefined') {
				callback(err, result);
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


module.exports = dbService;
