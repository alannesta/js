var connection = require('../utils/mysql-connector');

var dbService = {
	save: function(metas, callback) {

		var values = generateInsertValues(metas, ['片名', 'url', '时长', '作者', '查看', '收藏', '添加时间', '留言']);

		var query2 = `INSERT INTO videos (title, url, length, author, view_count, favourite, date_created, comment)
						VALUES ? ON DUPLICATE KEY
						UPDATE view_count=VALUES(view_count), favourite=VALUES(favourite), comment=VALUES(comment)`;

		connection.query(query2, [values], function(err, result) {
			if (err) {
				console.log(err);
			}
			//console.log(result);
			if (typeof callback !== 'undefined') {
				callback(err, result);
			}
		});
	}
};

function generateInsertValues(objects, keys) {
	var items = [];
	objects.forEach(function(object) {
		var entry = [];
		keys.forEach(function(key) {
			entry.push(object[key]);
		});
		items.push(entry);
	});
	return items;
}

module.exports = dbService;
