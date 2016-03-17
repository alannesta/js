const express = require('express');
const path = require('path');
//const exec = require('child_process').exec;
const spawn = require('child_process').spawn;

const app = express();
const script_path = '/Users/sijin.cao/Desktop/gitclone.sh';

app.post('/build-rss', function(req, res) {
	//console.log(req.body);
	const child_process = spawn(script_path, {
		shell: true
	});
	child_process.stdout.pipe(process.stdout);
	child_process.on('exit', (code, signal)=> {
		console.log(`exit code: ${code}`);
		console.log(`signal: ${signal}`);
		res.status(200).send();
	});
	//const child_process = exec(script_path, (error, stdout, stderr)=> {
	//	console.log(`stdout ${stdout}`);
	//	res.status(200).send();
	//	if (error !== null) {
	//		console.log(`error ${error}`);
	//	}
	//});
	//child_process.stdout.pipe(process.stdout);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.listen(3001);
