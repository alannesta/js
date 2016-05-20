var p1 = new Promise(function(resolve, reject) {
	setTimeout(()=> {
		reject('p1 rejection');
	}, 1000)
});

var p2 = new Promise(function(resolve, reject) {
	setTimeout(()=> {
		reject('p2 rejection');
		//throw new Error('p2 error')
	}, 1000);
});

var p3 = new Promise(function(resolve, reject) {
	setTimeout(()=> {
		resolve('p3 resolve');
	}, 1000)
});

p1.then(function(result) {
	return p2;
}).catch(function(err) {
	console.log('catch p1?');
	console.log(err);
}).then(function(result) {
	return p3;
}).catch(function(err) {
	console.log('catch p2 here?');
	console.log(err);
}).then(function(result) {
	console.log(result);
}).catch(function(err) {
	console.log('catch p2 finally?');
	console.log(err);
});