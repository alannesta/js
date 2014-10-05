var fs = require('fs');

var url1 = "https://help.github.com/articles/set-up-git.js"
var url2 = "https://gist.github.com/help"
var url3 = "http://gist.github.com/discover.jpg"
var url4 = "http://www.github.com/moneycloud.css"
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

var reg5 = /^((?!.*js|.*css).)*github.com.*$/g  	//not containing css or js

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

console.log(url1.match(reg5));
console.log(url2.match(reg5));
console.log(url3.match(reg5));
console.log(url4.match(reg5));	


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
// var re1 = /[(ip)|(fe)]/g 	//i,p,i,e,f,e
// console.log(str.match(re1));

/**------------[^xyz]---------------*/
// var str1 = "<input type='password' max-length = 10>"
// var str3 = "<input type='username' max-length = 10>"
// var str2 = "<input type='username'><textarea type='password' max-length=10>"
// var re = /<input[^>]*(password|username).*?>/g 	 	//!!pay attention to the * after [^>] 

// console.log(str1.match(re));		//matched!
// console.log(str3.match(re));		//null



/**------------group match with or----------*/
// var str = '123456789';
// // var re = /1234|567/g   		//[1234,567]
// // var re = /12(3|4)567/g		//null
// // var re = /12(34|4)567/g 	//[1234567]	
// var re = /(234\d+?)|(67.+)/g;	//2345, 6789
// var re1 = /(234\d+)|(67.+)/g;	//23456789
// 								//or后面6789匹配不到原因应该和量词和贪婪模式有关，还需要分析
// var re2 = /234\d+|678.+/g;		//23456789	there will never be such requirement in real situations
// console.log(str.match(re1));
// console.log(str.match(re2));



/**--------------(:?)(=?)(?!)----------------*/
// var str = '<a href="/help/support"/>';
// // var re = /(?=href=")[^"]+"/g
// var re2 = /href="[^"]+(?!")/g  //意图是匹配后面不是"/"的href, 得到的结果却不是null
// 								//实际结果: href="/help/suppor 这就是用量词匹配， 未写明边界容易犯的错误

// var re3 = /(?!.+\/>$)href="[^"]+/g 	//很常见的负向前瞻的前置，先进行排除，再匹配
// 									//经常用于判定结尾不是.js/.css的文件

// var rejs = /(?!.+\.js$|.+\.css$).*/g;	//这里用.*这种wild card量词进行匹配就会出现
// 										//匹配到".js"的情况
// var strjs = "test.wow.js";
// console.log(strjs.match(rejs));

// // var str2 = 'alaanesta'
// // var re3 = /a[^n]+(?!nesta)/g
// // var re4 = /alan(?!nesta)/g
// // console.log(str2.match(re3));	//ala 有路可退---> 从alaa后退一步找到ala满足
// // console.log(str2.match(re4));	//nul 无路可逃---> null

// // console.log(str.match(re));
// console.log(str.match(re2));
// console.log(str.match(re3));


