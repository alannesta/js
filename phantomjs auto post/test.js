var casper = require('casper').create();


// casper.start();
var url = casper.cli.args.slice(0,1)[0];
// var url = require("utils").dump(casper.cli.args);
// console.log(url[0]);
// casper.exit();
console.log(url);

// casper.start(url, function() {

// 	console.log("start callback")
//     this.echo(this.getTitle());
// });

// casper.thenOpen(url, function() {
// 	console.log("thenOpen callback")
//     this.echo(this.getTitle());
// });


// casper.run(function(){
// 	console.log("done");
// });
