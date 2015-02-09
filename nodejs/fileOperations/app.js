var fs = require('fs');
var folder = 'data';
var model = {'data': []};

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

function readDirectory(folder, depth){
    fs.readdir(folder, function (err, files) {
        if (err) throw err;
        files.forEach(function (item) {
            var filePath = folder + '/' + item;
            var temp = model;
            if (isFile(filePath) && filterFile(filePath)) {
                
                for (var i = 0; i<depth.length;i++){
                    temp = temp[depth[i]];
                }
                temp.push(item);
                // readFile(filePath);
            }else if(isDirectory(filePath)){
                for (var i = 0; i<depth.length;i++){
                    temp = temp[depth[i]];
                }
                temp.push({item: []});
                // console.log(filePath);
                var dep = filePath.split('/');
                readDirectory(filePath, dep);
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

readDirectory(folder, [folder]);
setTimeout(function(){
    console.log(model);
},1000);