/*
    Count the number of certain characters in a String
    Key: the use of hashmap data structure in javascript
*/

function countChar(text){
    var map = {};   //obj works as a hashmap
    for (var i = 0, length = text.length; i<length; i++){
        if (typeof map[text[i]]!= "undefined"){
            map[text[i]] = map[text[i]] + 1;
        }else{
            map[text[i]] = 1;
        }    
    }
    return map;
}

function countChar2(text, char){
    var exp = char+"{1}"
    var reg = new RegExp(exp, "g");
    
    return (text.match(reg).length);
}


var text = "aaCa BBB cCa"

console.log(countChar(text)['B']);
console.log(countChar2(text, 'a'));