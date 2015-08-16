/**
 * string.match 最为常用，直接返回match结果(返回第一个或者使用/g flag返回全部)， 干脆利落
 *
 * regx.exec 只返回first match found
 * 要返回全部则要通常应用于有global flag的regular expression, 在一个while loop里使用
 *
 */

var myString = "[22].[44].[33].";
var reg = /\d+/g;
var result;

console.log(myString.match(/\d+/)); // [ '22', index: 1, input: '[22].[44].[33].' ]
console.log(myString.match(/\d+/g));    //[ '22', '44', '33' ]

console.log(reg.exec(myString));

while(result = reg.exec(myString)) {
    console.log(result);
}


// !! WRONG, infinite loop
//while(result = /\d+/g.exec(myString)) {
//    console.log(result);
//}
/**
 *
 * Regexp 上的方法通常会dynamically update Reg object itself...
 */

var reg = /abc/g;
console.log('abcdefghi'.match(reg)); // => true
console.log(reg.test('abcdefghi'));    // => true
console.log(reg.test('abcdefghi'));    // => false <=