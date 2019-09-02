const path = require('path');

function CustomError() {
	// Use V8's feature to get a structured stack trace
	const oldStackTrace = Error.prepareStackTrace;
	const oldLimit = Error.stackTraceLimit;
	try {
		Error.stackTraceLimit = 3; // <- we only need the top 3
		Error.prepareStackTrace = (err, structuredStackTrace) => structuredStackTrace;
		Error.captureStackTrace(this, CustomError);
		this.stack; // <- invoke the getter for 'stack'
	} finally {
		Error.stackTraceLimit = oldLimit;
		Error.prepareStackTrace = oldStackTrace;
	}
}
function getAndFormatStackTraceElement() {
	const stack = new CustomError().stack;
	const CALLER_INDEX = 0; // <- position in stacktrace to find deepest caller
	const element = stack[CALLER_INDEX];
	const fileName = path.basename(element.getFileName());
	return element.getFunctionName() + "(" + fileName + ":" + element.getLineNumber() + ")";
}

function kaka(str) {
	return JSON.parse(str);
}

try {
	kaka('1:1');
} catch(err) {
	console.log(err.stack);
	console.log(err.message);
	console.log(err.toString());
	//console.log('stuff:');
	//console.log(getAndFormatStackTraceElement());
}