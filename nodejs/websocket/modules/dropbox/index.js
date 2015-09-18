var https = require('https');
var fs = require('fs');

var access_token = 'XMoE6qP_C28AAAAAAAABr8Zn33ySn2ND5EYLkBMC16R_lqX_nJ5nlYoMfs80yjsc';

var file = fs.readFileSync('pic.jpeg');

function revision(file) {
    
}

function upload2Dropbox(file) {
    var options = {
        hostname: 'content.dropboxapi.com',
        port: 443,
        path: '/1/files_put/auto/pic.jpeg',
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + access_token,
            ContentType: 'application/octet-stream'
        }
    };

    var req = https.request(options, function(res) {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);

        res.on('data', function(d) {
            process.stdout.write(d);
        });
    });

    req.write(new Buffer(file));    // req.write requires a buffer as arguments

    req.end();

    req.on('error', function(e) {
        console.error(e);
    });
}

exports.upload = upload2Dropbox;
