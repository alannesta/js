var fs = require('fs');

var url1 = "https://help.github.com/articles/set-up-git.js"
var url2 = "https://gist.github.com/help"
var url3 = "http://gist.github.com/discover.jpg"
var url4 = "http://www.github.com/moneycloud.png"
var html = ""

fs.readFile('assets/github.html', function (err, data) {
  if (err) throw err;
  html = data.toString();
  console.log(html.match(reg));
});


var reg = /(?:https|http):\/\/.*github\.com.*[^"][^'][^>]/g
var reg1 = /(?:https|http):\/\/.*github\.com.*/
var reg2 = /(?:https|http):\/\/.*github\.com.*[^.](?!\.png)/
var reg3 = /(?:https|http):\/\/.*github\.com.*[^\.png]$/  //not ending with . or p or n or g....
var reg4 = /^(?!.*\.png$|.*\.jpg$|.*\.js$).*github.com.*$/		//not ending with png, jpg, js

// console.log(html.match(reg1));




// console.log(url1.match(reg));
// console.log(url2.match(reg));
// console.log(url3.match(reg));
// console.log(url4.match(reg));

// console.log(url1.match(reg4));
// console.log(url2.match(reg4));
// console.log(url3.match(reg4));
// console.log(url4.match(reg4));

/**---------------test cases-------------------*/

// global vs unglobal

// var re = /\w+\s/g;		//['fee ', 'fi ', 'fo ', 'fum ']---> search throughout the string, return all matches
// var re2 = /\w+\s/		// only returns the first match
// var str = "fee fi fo fum";
// var myArray = str.match(re);
// console.log(myArray);

//greedy vs lazy

// var url4 = "http://www.github.com/moneycloud.png"
// var reg3 = /.*moneycloud(?!.png)/	//null
// var reg3 = /.*moneycloud(?!.png)/	//http://www.github.com/moneycloud.png ---> default greedy mode
// var reg3 = /.*?moneycloud(?!.png)/	//null ---> !!! ungreedy mode, match as few as possible
// console.log(url4.match(reg3));