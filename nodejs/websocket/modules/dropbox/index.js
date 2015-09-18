var https = require('https');
var fs = require('fs');
var os = require('os');

var access_token = 'XMoE6qP_C28AAAAAAAABr8Zn33ySn2ND5EYLkBMC16R_lqX_nJ5nlYoMfs80yjsc';

//var file = fs.readFileSync('pic.jpeg');

// generate file revision
function revision() {
    //console.log(os.cpus());
    //console.log(os.hostname());
    //console.log(os.platform());
    //return os.hostname() + '@' + os.cpus()[0].model.replace('/\\s+/', "");
    return 'result@'+ os.hostname() +'.png';
}

function upload2Dropbox(file) {
    var options = {
        hostname: 'content.dropboxapi.com',
        port: 443,
        path: '/1/files_put/auto/' + revision(),
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

//console.log(revision());

exports.upload = upload2Dropbox;
