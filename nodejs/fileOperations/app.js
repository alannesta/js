var fs = require('fs');
var folder = 'data';


function readFile(path) {
    fs.readFile(path, 'utf-8', function (err, data) {
        if (err) throw err;
        console.log(data);
    });
}

function readDirectory(folder){
    fs.readdir(folder, function (err, files) {
        if (err) throw err;
        files.forEach(function (item) {
            var filePath = folder + '/' + item;
            if (isFile(filePath) && filterFile(filePath)) {
                console.log('Path: '+filePath);
                readFile(filePath);
            }else if(isDirectory(filePath)){
                console.log(filePath);
                readDirectory(filePath);
            }
        });
    });
}


function isFile(filePath) {
    stats = fs.statSync(filePath);
    return !stats.isDirectory();
}

function isDirectory(filePath){
    stats = fs.statSync(filePath);
    return stats.isDirectory();
}

function filterFile(filePath){
    var hiddenFileReg =/\.DS/;
    var jshtmlFileReg = /\.js/;
    return jshtmlFileReg.test(filePath) && !hiddenFileReg.test(filePath);

}

readDirectory(folder);