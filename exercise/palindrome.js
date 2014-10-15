/*
	Problem1: test if a string is palindrome

	Definition: A palindrome is a word, phrase, number, or other sequence of symbols or elements that reads the same forward or reversed

	Problem2: find the longest palindromic substring
*/

//O(n)

function testPalindrome(str){
	var ret = ""
	for(length = str.length, i = length-1; i >= 0; i--){	
		ret = ret + str[i];
	}
	console.log(ret);
	if (ret === str){
		return true;
	}
	return false;
}

// console.log(testPalindrome("avvbcva"));

//a faster way

function isPalindrome(str){
  var i, len = str.length;
  for(i =0; i<len/2; i++){
    if (str[i]!== str[len -1 -i])
       return false;
  }
  return true;
}

console.log(testPalindrome("ava ava"));

/*-------------------------Problem 2--------------------------------------*/







