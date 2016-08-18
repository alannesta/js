var async = require('async');

module.exports = function(next) {
	//setTimeout(function() {
	//	JSON.parse('1:23');
	//}, 1000)
	async.series([
			function(callback){
				setTimeout(function() {
					callback(null, 'one');
				}, 1000);
			},
			function(callback){
				setTimeout(function() {
					callback(null, 'two');
				}, 1000);
			}
		],
		(err, results)=>{
			//JSON.parse('1:1');
			//this.book.kaka = 0;
			try {
				JSON.parse('1:1');

			}catch(err) {
				//throw err;
				console.log('will catch @ first place');
				next(err);
			}
		});

	return true;
};
