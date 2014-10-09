/*
	Three very important Function.prototype functions
	the purpose is of these three is to "borrow" function
*/
var monica = {
  name: 'Monica Geller',
  total: 400,
  deductMontlyFee: function(fee){
     this.total = this.total - fee;
     console.log(this.name + ' remaining balance is '+ this.total); 
  }
}

var rachel = {name: 'Rachel Green', total: 1500};


var rachelFeeDeductor = monica.deductMontlyFee.bind(rachel, 200);
monica.deductMontlyFee.apply(rachel, [200]);	//"Rachel Green remaining balance is 1300"
monica.deductMontlyFee.call(rachel, 200);		//"Rachel Green remaining balance is 1100"
rachelFeeDeductor(); 				//"Rachel Green remaining balance is 900"
rachelFeeDeductor(); 				//"Rachel Green remaining balance is 700"


//borrow the Math.max method
function findMax(arr){
	return Math.max.apply(null, arr);
}
console.log(findMax([1,2,333,4,52]));

/*
	Currying function Example
*/
Function.prototype.curry = function(){
	var self = this;
	params = [].slice.call(arguments);
	return function(args){

		self.apply(self, params.concat(args))
	}
}

function converter(factor, symbol, input){
  console.log(input * factor + symbol);
  return input * factor + symbol;
}

var milesToKm = converter.curry(1.62, 'km');
milesToKm(3); //result here

var kgToLb = converter.curry(2.2, 'lb');
kgToLb(3); //result here 


/*
	shim: how bind works
*/

// Function.prototype.bind = Function.prototype.bind || function(context){
//   var self = this;
//   return function(){
//     return self.apply(context, arguments);
//   };
// }
  