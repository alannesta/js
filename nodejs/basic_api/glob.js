var glob = require("glob")

// options is optional
//glob("node_modules/**/*.js", function (er, files) {
//    console.log(files);
//});

//glob("node_modules/*/*.js", function (er, files) {
//    console.log(files);
//});

//glob("node_modules/**/!(*ser).js", function (er, files) {
//    console.log(files);
//});

glob("!(*-*).js", function (er, files) {
    console.log(files);
});