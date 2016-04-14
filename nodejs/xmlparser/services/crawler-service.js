var connection = require('../utils/mysql-connector');

var crawlerService = {

	save: function(metas, callback) {
		var query = 'INSERT INTO videos SET ? ON DUPLICATE KEY UPDATE ?';
		metas.forEach(function(meta) {
			var payload = {
				title: meta['片名'],
				url: meta['url'],
				length: meta['时长'],
				author: meta['作者'],
				view_count: meta['查看'],
				favourite: meta['收藏'],
				hour_since_created: meta['添加时间'],
				comment: meta['评论']
			};

			var updatePayload = {
				view_count: meta['查看'],
				favourite: meta['收藏'],
				comment: meta['评论']
			}
		});
		connection.query(query, {})
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

module.exports = crawlerService;
