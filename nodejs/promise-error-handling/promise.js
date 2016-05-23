const fecth = require('isomorphic-fetch');
const url = 'https://testwacomeur.appdirect.com/api/channel/v1/styles/WACOM/theme/published?locale=en-US';

function requestStuff() {

	return fetch(url).then(function(res) {
		if (res.status === 200) {
			//logger.verbose('Templates fetched ...');
			return res.json().then(function(template) {
				JSON.parse('{1:3}');
				return template;
			}).catch(function(err) {
				console.log('early bird error handler:');	// catch the error here without leaking it to outer error handler
				console.log('not error thrown any further');
			});
		} else {
			throw new Error('Fail to fetch template for ' + url);
		}
	});

	//return fetch(url).then(function(res) {
	//	if (res.status === 200) {
	//		logger.verbose('Templates fetched ...');
	//		return res.json().then(function(template) {
	//			const temp = tc5kClient.parse(template, bootstrap, deps);
	//			//console.log(temp);
	//			return temp;
	//		}).catch(function(err) {
	//			throw err;
	//		});
	//	} else {
	//		throw new Error('Fail to fetch template for ' + url);
	//	}
	//}).catch(function(err) {
	//	throw new Error('Fail to fetch template for ' + url);
	//});
}


var p1 = new Promise(function(resolve, reject) {
	setTimeout(()=> {
		console.log('p1 execution');
		//reject('p1 rejection');
		resolve('p1 rejection');
	}, 2000)
});

//p1.then(function(result) {
//	return new Promise(function(resolve, reject) {
//		setTimeout(()=> {
//			//console.log('p2 execution');
//			reject('p2 rejection');	//can catch the rejection
//			//throw new Error('p2 error')	// cannot catch this error
//		}, 2000);
//		//JSON.parse('{1:3}');	// can catch this error (sync)
//	});
//	//setTimeout(function() {
//	//	JSON.parse('{1:3}');	// cannot catch this error (async)
//	//},2000);
//}).catch(function(err) {
//	// if catch errors on each step, following steps will also be executed
//	console.log('catch p2 rejection:');
//	console.log(err);
//}).then(function(result) {
//	return new Promise(function(resolve, reject) {
//		setTimeout(()=> {
//			console.log('p3 execution');
//			resolve('p3 resolve');
//		}, 3000)
//	});
//}).catch(function(err) {
//	console.log('catch p3 rejection:');
//	console.log(err);
//}).then(function(result) {
//	console.log(result);
//}).catch(function(err) {
//	console.log('nothing');
//	console.log(err);
//});


//p1.then(function(result) {
//	return new Promise(function(resolve, reject) {
//		setTimeout(()=> {
//			console.log('p2 execution');
//			//reject('p2 rejection');
//			throw new Error('p2 error');
//		}, 2000);
//	});
//}).then(function(result) {
//	return new Promise(function(resolve, reject) {
//		setTimeout(()=> {
//			console.log('p3 execution');
//			reject('p3 resolve');
//		}, 3000)
//	});
//}).then(function(result) {
//	console.log(result);
//}).catch(function(err) {	// with only one catch in the end, execution flow will be aborted when a rejection is caught
//	console.log('single error handler:');
//	console.log(err);
//});


// early catch is the best practice
p1.then(function() {
	console.log('p2');
	return requestStuff().catch(function(err) {
		console.log('another early bird catcher');
		console.log('no error leak');
	});
}).then(function(stuff) {
	console.log('p3');
	return requestStuff();
}).catch(function(err) {	// with only one catch in the end, execution flow will be aborted when a rejection is caught
	console.log('single error handler:');
	console.log(err);
});


//活在梦里?
//try {
//	p1.then(function() {
//		console.log('p2');
//		return requestStuff();
//	}).then(function(stuff) {
//		console.log('p3');
//		return requestStuff();
//	});
//}catch(err) {
//	console.log('really?', err);
//}
