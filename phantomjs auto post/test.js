var casper = require('casper').create();

casper.start('http://casperjs.org/', function() {
	console.log("start callback")
    this.echo(this.getTitle());
});

console.log('in between');

casper.thenOpen('http://phantomjs.org', function() {
	console.log("thenOpen callback")
    this.echo(this.getTitle());
});

console.log('after then');

casper.run(function(){
	console.log("done");
});
