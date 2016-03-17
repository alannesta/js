const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const exec = require('child_process').exec;
//const spawn = require('child_process').spawn;

const app = express();
const script_path = '/Users/sijin.cao/Desktop/gitclone.sh';

app.use(bodyParser.json());

app.post('/build-rss', function(req, res) {
	console.log(req.body);

	//child_process.spawn()
	//const child_process = spawn(script_path, {
	//	shell: true
	//});
	//child_process.stdout.pipe(process.stdout);
	//child_process.on('exit', (code, signal)=> {
	//	console.log(`exit code: ${code}`);
	//	console.log(`signal: ${signal}`);
	//	res.status(200).send();
	//});

	//child_process.exec()
	const repoUrl = req.body.repository.url;
	var arr = repoUrl.split('/');
	const projectPath = arr[arr.length-1].replace('.git', '');
	const command = script_path + ' --repo ' + repoUrl + ' --project_path ' + projectPath;
	const child_process = exec(command, (error)=> {
		if (error !== null) {
			console.log(`error ${error}`);
			res.status(500).send(error);
		} else {
			res.status(200).send('shell script successfully executed');
		}
	});
	child_process.stdout.pipe(process.stdout);
});

app.listen(3001);
