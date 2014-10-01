var url1 = "https://help.github.com/articles/set-up-git"
var url2 = "https://gist.github.com/help"
var url3 = "http://gist.github.com/discover.png"
var url4 = "http://www.github.com/moneycloud.png"

var reg = /(?:https|http):\/\/.*github\.com.*[^.png | .jpg | .js | .css | ']/
var reg2 = /(?:https|http):\/\/.*github\.com.*[^.](?!\.png)/

var reg3 = /(?:https|http):\/\/.*github\.com.*[^(\.png)]$/  //not ending with . or p or n or g....
var reg4 = /^(?!.*\.png$).*github.com.*$/		//not ending with png



// var reg3 = /.*moneycloud(?!.png)/	//null
// var reg3 = /.*moneycloud(?!.png)/	//http://www.github.com/moneycloud.png ---> default greedy mode
// var reg3 = /.*?moneycloud(?!.png)/	//null ---> !!! ungreedy mode, match as few as possible
// console.log(url4.match(reg3));

// console.log(url1.match(reg));
// console.log(url2.match(reg));
// console.log(url3.match(reg));
// console.log(url4.match(reg));

console.log(url1.match(reg4));
console.log(url2.match(reg4));
console.log(url3.match(reg4));
console.log(url4.match(reg4));