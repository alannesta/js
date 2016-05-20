var p1 = new Promise(function(resolve, reject) {
	setTimeout(()=> {
		console.log('p1 execution');
		//reject('p1 rejection');
		resolve('p1 rejection');
	}, 2000)
});

p1.then(function(result) {
	return new Promise(function(resolve, reject) {
		//setTimeout(()=> {
		//	//console.log('p2 execution');
		//	reject('p2 rejection');	//can catch the rejection
		//	//throw new Error('p2 error')	// cannot catch this error
		//}, 2000);
		//JSON.parse('{1:3}');	// can catch this error (sync)
		return new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve('kaka')
			}, 2000);
		})
		.then(function() {
			return Promise.reject('kaka');
		});
	});
	//setTimeout(function() {
	//	JSON.parse('{1:3}');	// cannot catch this error (async)
	//},2000);
}).catch(function(err) {
	console.log('catch p2 rejection:');
	console.log(err);
}).then(function(result) {
	return new Promise(function(resolve, reject) {
		setTimeout(()=> {
			console.log('p3 execution');
			resolve('p3 resolve');
		}, 3000)
	});
}).catch(function(err) {
	console.log('catch p3 rejection:');
	console.log(err);
}).then(function(result) {
	console.log(result);
}).catch(function(err) {
	console.log('nothing');
	console.log(err);
});

//p1.then(function(result) {
//	return new Promise(function(resolve, reject) {
//		setTimeout(()=> {
//			console.log('p2 execution');
//			//reject('p2 rejection');
//			throw new Error('p2 error')
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
//}).catch(function(err) {
//	console.log('catch all');
//	console.log(err);
//});

