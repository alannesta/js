'use strict';
var Transform = require('stream').Transform;
var Readable = require('stream').Readable;
var morse = require('morse');

class Morsify extends Transform {
	constructor() {
		super()
	}
	_transform(buf, enc, next) {
		const word = buf.toString().toUpperCase();
		this.push(morse.encode(word) + '\n\n');
		next()
	}
}

class SourcePiper extends Readable {

	constructor() {
		super();
		this.source = ['aa', 'bb', 'cc'];
	}

	_read() {
		this.push( this.source.shift() || null);
	}
}

process.stdin
	.pipe(Transform({
		objectMode: true,
		transform: function (buf, enc, next) {
			next(null, buf.toString().replace(/\n/g, ''))
		}
	}))
	.pipe(new Morsify())
	.pipe(process.stdout);

//new SourcePiper()
//	.pipe(Transform({
//		objectMode: true,
//		transform: function (buf, enc, next) {
//			next(null, buf.toString().toUpperCase())
//		}
//	}))
//	//.pipe(new Morsify())
//	.pipe(process.stdout);
