var connection = require('../utils/mysql-connector');

var crawlerService = {

	save: function(metas, callback) {

		var values = generateInsertValues(metas, ['片名', 'url', '时长', '作者', '查看', '收藏', '添加时间', '留言']);
		var values2 = generateInsertValues(metas, ['查看', '收藏', '留言']);

		var query2 = `INSERT INTO videos (title, url, length, author, view_count, favourite, date_created, comment)
						VALUES ? ON DUPLICATE KEY
						UPDATE view_count=VALUES(view_count), favourite=VALUES(favourite), comment=VALUES(comment)`;

			connection.query(query2, [values], function(err, result) {
				if(err) {
					console.log(err);
				}
				console.log(result);
				if (typeof callback !== 'undefined') {
					callback(err, result);
				}
			});

		//var query = 'INSERT INTO videos SET ? ON DUPLICATE KEY UPDATE ?';
		//
		//metas.forEach(function(meta) {
		//	var payload = {
		//		title: meta['片名'],
		//		url: meta['url'],
		//		length: meta['时长'],
		//		author: meta['作者'],
		//		view_count: meta['查看'],
		//		favourite: meta['收藏'],
		//		date_created: meta['添加时间'],
		//		comment: meta['留言']
		//	};
		//
		//	var updatePayload = {
		//		view_count: meta['查看'],
		//		favourite: meta['收藏'],
		//		comment: meta['留言']
		//	};
		//
		//	connection.query(query, [payload, updatePayload], function(err, result) {
		//		if(err) {
		//			console.log(err);
		//		}
		//		if (typeof callback !== 'undefined') {
		//			callback(err, result);
		//		}
		//	})
		//});
	}

	//saveFeed: function(feed, callback) {
	//	var service = this;
	//	var insertQuery = "INSERT IGNORE INTO feed SET ?";
	//	logger.info('FeedService.saveFeed: ', feed);
	//	connection.query(insertQuery, {
	//		feed_name: feed.feedName,
	//		feed_url: feed.feedUrl
	//	}, function (err, result) {
	//		if (result.affectedRows == 0) {
	//			// which means there could be a duplicate, and not inserted successfully
	//			callback("Insertion Failed, Duplicate!");
	//		}else {
	//			service.getFeedByUrl(feed.feedUrl, callback);
	//		}
	//	});
	//
	//},
	//
	//getFeedByUrl: function(feedUrl, callback) {
	//	var query = "SELECT * from feed WHERE feed_url ='" + feedUrl + "'";
	//	connection.query(query, function(err, result) {
	//		if (err) {
	//			logger.error("SQL_ERROR::getFeedByID: ", err);
	//			callback(err);
	//		}else{
	//			console.log('getfeedbyid', result[0]);
	//			callback(err, result[0]);
	//		}
	//
	//	});
	//}
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

module.exports = crawlerService;
