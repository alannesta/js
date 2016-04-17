var connection = require('../utils/mysql-connector');

var DataMiner = {
	updateTrending: function() {
		var query = `SELECT title, url, length, view_count, favourite, date_created, comment
						FROM videos`;

		var query2 = `INSERT INTO hot (title, url, length, trend, view_count, favourite, comment)
						VALUES ? ON DUPLICATE KEY
						UPDATE view_count=VALUES(view_count), favourite=VALUES(favourite), comment=VALUES(comment)`;

		connection.query(query, function(err, results) {
			//console.log(results);
			if (err) {
				throw err;
			} else {
				var payload = [];
				results.forEach(function(result) {
					//console.log('Trend: ---> ' + trend);
					payload.push([result.title, result.url, result.length, trending(result.view_count, result.date_created), result.view_count, result.favourite, result.comment]);

				});
				connection.query(query2, [payload], function(err, results) {
					if(err) {
						console.log('update Trend Err: ' + err);
					}else {
						console.log(results);
					}
				})
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

//function generateInsertValues(objects, keys) {
//	var items = [];
//	objects.forEach(function(object) {
//		var entry = [];
//		keys.forEach(function(key) {
//			entry.push(object[key]);
//		});
//		items.push(entry);
//	});
//	return items;
//}


module.exports = DataMiner;