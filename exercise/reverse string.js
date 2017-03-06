var str1 = "abcdefghe";

//standard way
String.prototype.reverse = function(){
	var temp = "";
	for (var i = this.length-1; i >= 0; i--){
		console.log(this[i]);
		temp = temp + this[i];
	}
	return temp
}

//recursive way
function reverse (str) {
    if (str === "") {
        return "";
    } else {
    	// console.log(str.charAt(0));
        return reverse(str.substring(1)) + str.charAt(0);
    }
}


// console.log(str1.reverse());

// console.log(reverse(str1));