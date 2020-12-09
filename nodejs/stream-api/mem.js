const fs = require('fs');
const srcPath = '/Users/alancao/Documents/video/camping2.MOV';

file = fs.readFileSync(srcPath);
setTimeout(() => {
    console.log(file)   // check mem usage
}, 4000);

// setInterval(() => {
//     console.log('lol')
// }, 2000);
//
//
// console.log(process.stdout.writableLength);