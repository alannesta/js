var grpc = require('grpc');
var path = require('path');

var PROTO_PATH = path.join(process.cwd(), '../proto/service.proto');

console.log(PROTO_PATH);

var rpc = grpc.load(PROTO_PATH).rpc;

function main() {
	var client = new rpc.AnalyticsRPCService('localhost:9527', grpc.credentials.createInsecure());

	client.getUserFavoriteReport({}, function(err, response) {
		console.log('response:', response.message);
	});
}

main();
