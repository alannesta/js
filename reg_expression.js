var fs = require('fs');

var url1 = "https://help.github.com/articles/set-up-git.js"
var url2 = "https://gist.github.com/help"
var url3 = "http://gist.github.com/discover.jpg"
var url4 = "http://www.github.com/moneycloud.png"
var html = ""
var result = [];

// fs.readFile('assets/github.html', function (err, data) {
//   if (err) throw err;
//   html = data.toString();
//   html.match(reg1).forEach(function(url, index){
//   	// console.log(url + "-->test: " + regSecond.test(url))
//   	if (!regSecond.test(url)){
//   		result.push(url);
//   	}
//   });
//   console.log(result);
// });


var reg = /(?:https|http):\/\/.*github\.com.*?["]/g
var reg1 = /(?:https|http):\/\/.*github\.com.*?(?=")/g
var reg2 = /(?:https|http):\/\/.*github\.com.*?(?=")/
var reg3 = /(?:https|http):\/\/.*github\.com.*[^\.png]$/  //not ending with . or p or n or g....
var reg4 = /^(?!.*\.png$|.*\.jpg$|.*\.js$).*github.com.*$/		//not ending with png, jpg, js

// console.log(html.match(reg1));
var regSecond = /\.jpg|\.png|\.js|\.css/	// do another round of test...




// console.log(url1.match(reg));
// console.log(url2.match(reg));
// console.log(url3.match(reg));
// console.log(url4.match(reg));

// console.log(url1.match(reg4));
// console.log(url2.match(reg4));
// console.log(url3.match(reg4));
// console.log(url4.match(reg4));

/**---------------test cases-------------------*/

/**------------global vs unglobal---------------*/

// var re = /\w+\s/g;		//['fee ', 'fi ', 'fo ', 'fum ']---> search throughout the string, return all matches
// var re2 = /\w+\s/		// only returns the first match
// var str = "fee fi fo fum";
// var myArray = str.match(re);
// console.log(myArray);

/**------------greedy vs lazy---------------*/

// var url4 = "http://www.github.com/moneycloud.png"
// var reg3 = /.*moneycloud(?!.png)/	//null
// var reg3 = /.*moneycloud(?!.png)/	//http://www.github.com/moneycloud.png ---> default greedy mode
// var reg3 = /.*?moneycloud(?!.png)/	//null ---> !!! ungreedy mode, match as few as possible
// console.log(url4.match(reg3));

/**------------[xyz]---------------*/
// var str = "taipingyangdefeng"
// var re = /[ipv|feng]/g 		//you cannot possibly group a word in a [], all matched by character...
// var re1 = /[(ip)|(fe)]/g
// console.log(str.match(re1));

/**------------[^xyz]---------------*/
// var str1 = "<input type='password' max-length = 10>"
// var str3 = "<input type='username' max-length = 10>"
// var str2 = "<input type='username'><textarea type='password' max-length=10>"
// var re = /<input[^>]*(password|username).*?>/g 	 	//!!pay attention to the * after [^>] 

// console.log(str1.match(re));		//matched!
// console.log(str2.match(re));		//null

/**------------group match with or----------*/
// var str = '123456789';
// var re = /1234|567/g   		//[1234,567]
// var re = /12(3|4)567/g		//null
// var re = /12(34|4)567/g 	//[1234567]	
// console.log(str.match(re));


