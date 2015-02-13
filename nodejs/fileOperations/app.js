var fs = require('fs');
var util = require('util');
var folder = 'data';
var model = {};

function readFile(path) {

    // asynchronizely readFile 
    fs.readFile(path, 'utf-8', function (err, data) {
        if (err) throw err;
        console.log(data);
    });

    // synchronizely readFile, no callback
    // try{
    //     console.log(fs.readFileSync(path, 'utf-8')); 
    // }catch (err){
    //     console.log(err);
    // }
}

function readDirectory(folder, sub){

    fs.readdir(folder, function (err, files) {
        if (err) throw err;

        var arr = folder.split('/');
        var current = arr[arr.length-1];
        if (sub[current] === undefined){
            Object.defineProperty(sub, current, {value: [], enumerable: true, writable: true});
            //sub[current] = [];
        }
        files.forEach(function (item) {
            var filePath = folder + '/' + item;

            if (isFile(filePath) && filterFile(filePath)) {
                sub[current].push(item);
            }else if(isDirectory(filePath)){
                var newSub = new Object();
                //newSub[item] = [];
                Object.defineProperty(newSub, item, {value: [], enumerable: true, writable: true});
                sub[current].push(newSub);
                readDirectory(filePath, newSub);
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


readDirectory('../fileOperations', model);

setTimeout(function(){
    console.log(util.inspect(model, false, null));
    //console.log('model : %j', model);
},1000);