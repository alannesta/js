var grpc = require('grpc');
var path = require('path');

var PROTO_PATH = path.join(process.cwd(), '../proto/service.proto');

console.log(PROTO_PATH);

var rpc = grpc.load(PROTO_PATH).rpc;

function main() {
	var client = new rpc.AnalyticsRPCService('localhost:9527', grpc.credentials.createInsecure());

	// client.getUserFavoriteReportV2({dateSpan: 30}, function(err, response) {
	// 	console.log('response:', response);
	// });

	client.getUserFavoriteReport({}, function(err, response) {
		console.log('response:', response);
	});

}

main();
