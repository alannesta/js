var connection = require('../utils/mysql-connector');

var DataMiner = {
	updateTrending: function() {
		var query = `SELECT title, url, length, view_count, favourite, date_created, comment, id
						FROM videos`;

		var query2 = `INSERT INTO hot (title, url, length, trend, view_count, favourite, comment, video_id)
						VALUES ? ON DUPLICATE KEY
						UPDATE view_count=VALUES(view_count), favourite=VALUES(favourite), comment=VALUES(comment)`;

		var query3= `UPDATE videos SET last_process=? WHERE (last_update > last_process OR last_process IS NULL)`;

		connection.query(query, function(err, results) {
			if (err) {
				throw err;
			} else {
				var payload = [];
				results.forEach(function(result) {
					payload.push([result.title, result.url, result.length,
						trending(result.view_count, result.date_created),
						result.view_count, result.favourite, result.comment, result.id]);

				});
				connection.query(query2, [payload], function(err, results) {
					if (err) {
						console.log('update Trend Err: ' + err);
					} else {
						console.log(results);
						connection.query(query3, [new Date()], function(err, result) {
							if (err) {
								console.log('Update last_process timestamp err: ' + err);
							}else{
								console.log(result);
							}
						})
					}
				});
			}
		});
	}
};

function trending(viewCount, dateCreated) {

	var now = Date.now();		//TODO: use time_updated rather than now
	var created = new Date(dateCreated).getTime();
	var time = (now - created) / 3600000;		//convert to hour

	try {
		return Math.floor(parseInt(viewCount, 10) / time);
	} catch (err) {
		console.log(err);
	}
}


module.exports = DataMiner;