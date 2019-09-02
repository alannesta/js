const path = require('path');
const fs = require('fs');

class Scheduler {
	constructor() {
		const files = fs.readdirSync('./jobs');
		files.map(file => require(path.join(__dirname, 'jobs', file))).forEach(taskDef => {
			this.register(taskDef.task, taskDef.type, taskDef.time);
		});
	}

	/**
	 * Register a scheduled task
	 *
	 * @param job {function} the job to be ran
	 * @param type {string} either "interval" for recurring job or "timeout" for a onetime task
	 * @param time {number} delay/interval in seconds
	 */
	register(job, type, time) {
		if (type === 'interval') {
			return setInterval(job, time * 1000);
		}

		if (type === 'timeout') {
			return setTimeout(job, time * 1000);
		}
	}

}

new Scheduler();

setInterval(function() {
	console.log('hang');
}, 10000);