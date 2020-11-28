const http = require('http');
const fs = require('fs');

const throttle = new ThrottleStream({
   rate: 3 * 8 * 1024 * 1024 // 3MB per second
});
const server = http.createServer((req, res) => {
    if (req.path === '/1.mp4') {
        fs.createReadStream('/1.mp4').pipe(throttle).pipe(res);
    }
});
