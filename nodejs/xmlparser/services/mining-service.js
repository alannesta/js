var connection = require('../utils/mysql-connector');
var logger = require('../utils/logger');

var DataMiner = {
	updateTrending: function(callback) {
		var query = `SELECT title, url, length, view_count, favourite, date_created, last_update, comment, id
						FROM videos  WHERE (last_update>last_process OR last_process is NULL)`;

		var query2 = `INSERT INTO hot (title, url, length, trend, view_count, favourite, comment, video_id)
						VALUES ? ON DUPLICATE KEY
						UPDATE view_count=VALUES(view_count), favourite=VALUES(favourite), comment=VALUES(comment)`;

		var query3= `UPDATE videos SET last_process=? WHERE (last_update > last_process OR last_process IS NULL)`;

		connection.query(query, function(err, results) {
			if (err) {
				callback(err);
			} else {
				if (results.length > 0) {
					logger.debug('updating trending for ' + results.length + ' videos');
					// transaction callback hell...
					connection.beginTransaction(function(err) {
						if (err) {
							logger.error('DataMiner::updateTrending: start transaction error ->', err);
							callback(err);
						}
						var payload = [];
						results.forEach(function(result) {
							payload.push([result.title, result.url, result.length,
								trending(result.view_count, result.date_created, result.last_update),
								result.view_count, result.favourite, result.comment, result.id]);

						});
						connection.query(query2, [payload], function(err, results) {
							if (err) {
								logger.error('DataMiner::updateTrending: step2 calculate trend -> ' + err);
								return connection.rollback(function() {
									callback(err);
								});
							} else {
								logger.debug('update hot table success, updating timestamp');
								connection.query(query3, [new Date()], function(err, result) {
									if (err) {
										logger.error('DataMiner::updateTrending: step3 last_process timestamp -> ' + err);
										return connection.rollback(function() {
											callback(err);
										});
									}else{
										connection.commit(function(err) {
											if (err) {
												return connection.rollback(function() {
													callback(err);
												});
											}
											logger.debug('update trending transaction success!');
											callback();
										});
									}
								})
							}
						});
					});
				} else {
					logger.debug('no trending needs to be updated');
				}
			}
		});
	}
};

function trending(viewCount, dateCreated, dateUpdated) {

	var updated = new Date(dateUpdated).getTime();
	var created = new Date(dateCreated).getTime();
	var time = Math.round((updated - created) / 3600000);		//convert to hour
	try {
		return Math.floor(parseInt(viewCount, 10) / time);
	} catch (err) {
		logger.error('DataMiner::trending: calculate trend function -> ', err);
	}
}


module.exports = DataMiner;