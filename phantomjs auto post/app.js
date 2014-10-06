var cheerio = require("cheerio");
var phantom = require('phantom');

phantom.create(function (ph) {
	ph.createPage(function (page) {
		page.open('http://www.sinoquebec.com/bbs/index.php', function (status) {
			// console.log(this.content);
			console.log(page.content);
			var data = page.evaluate(function () {
				return document.querySelector('#navbar_username').outerHTML;
			});
			// console.log(document.querySelector('#navbar_username'));
			console.log(data);
			// } else {
			// 	console.log(page.content);
			// 	$ = cheerio.load(page.content);
			// 	var data = page.evaluate(function (data) {
			// 		return $("#navbar_username").text();
			// 	});

			// }
			// page.close();
			// ph.exit();
		});
	});
});





// $ = cheerio.load('<h2 class="title">Hello world</h2>');
// $('h2.title').text('Hello there!');
// $('h2').addClass('welcome');

// console.log($.html());