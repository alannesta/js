const Readable = require('stream').Readable;

// 底层数据
const dataSource = ['a', 'b', 'c'];

const readable = Readable();
readable._read = function () {
    if (dataSource.length) {
        this.push(dataSource.shift())
    } else {
        this.push(null)
    }
};

// 进入暂停模式
readable.pause();
readable.on('data', data => process.stdout.write('\ndata: ' + data));

var data = readable.read()
while (data !== null) {
    process.stdout.write('\nread: ' + data);
    data = readable.read()
}