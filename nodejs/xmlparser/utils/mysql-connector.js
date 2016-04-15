var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : process.env.MYSQL_USER || 'root',
	password : process.env.MYSQL_PWD || '',
	database : process.env.DATABASE || '91Trend'
});

module.exports = connection;
