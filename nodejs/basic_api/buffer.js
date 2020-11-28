//var buf = new Buffer(10);
//var buf = new Buffer([11,2,3,4,122]);
var buf = new Buffer('Hello World!', 'utf8');       // 12 byte buffer <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>

console.log(buf);

// var bufstring = buf.toString('utf8', 2, 12);
// console.log(bufstring);
// console.log(Buffer.byteLength(bufstring, 'utf8') + ' bytes/octets');

var arr = new Uint8Array(buf);

console.log(arr);