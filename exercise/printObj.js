/*
	Problem: print a obj without using JSON.stringify
*/

function printObj( obj ) {
  var arr = [];
  $.each( obj, function( key, val ) {
    var next = key + ": ";
    next += $.isPlainObject( val ) ? printObj( val ) : val;
    arr.push( next );
  });
  return "{ " +  arr.join( ", " ) + " }";
};

var obj = {
	name: "kaka",
	notes: [{location: "montreal"}, {time: "2014-1-1"}],
	test: {
		another: "1",
		another1: "3",
		another2: "2"
	},
	end: "yeehaw"
}

console.log(printObj(obj));