const fs = require('fs');
const Readable = require('stream').Readable;

// 底层数据
// const dataSource = ['a', 'b', 'c'];
//
// const readable = Readable();
// readable._read = function () {
//     if (dataSource.length) {
//         let nextChunk = dataSource.shift();
//         // console.log('next chunk:', nextChunk);
//         this.push(nextChunk)
//     } else {
//         this.push(null)
//     }
// };

const readable = fs.createReadStream('./mock/1.log', {autoClose: false});
const writable = fs.createWriteStream('./mock/1.log', {flags: 'a'});

// 进入暂停模式
readable.pause();

// ondata listner will trigger flow mode
// readable.on('data', data => {console.log(data)});

// onreadable will trigger flow mode
// readable.on('readable', (data) => {});
// readable.pause();

readable.on('end', () => {
   console.log('stream end');
});

readable.on('close', () => {
    console.log('stream close');
});

// pull in pause mode

function pull(rStream) {
    // console.log('pull:', rStream._readableState);
    if (rStream._readableState.ended) {
        rStream.resume();
        console.log('pull resume')
    }
    let data = rStream.read();

    while (data !== null) {
        console.log('read: ' + data);
        data = rStream.read();
    }

    // retry after 3 seconds
    setTimeout(() => {
        pull(rStream);
    }, 3000);
}

function push(wStream) {
    setInterval(() => {
        wStream.write('log input from writable' + '\n')
    }, 1000);
}

// onreadable will trigger flow mode
readable.on('readable', (data) => {
    // console.log(readable._readableState.flowing);
    pull(readable);
});

push(writable);


