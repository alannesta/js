const fs = require('fs');

const stream = fs.createReadStream('./mock/1.log');

// stream.on('data', chunk => {
//    console.log(chunk);
// });

stream.on('readable', () => {
    console.log('readable');
});

stream.on('end', () => {
    console.log('end');
});