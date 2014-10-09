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
	shim: how bind works
*/

// Function.prototype.bind = Function.prototype.bind || function(context){
//   var self = this;
//   return function(){
//     return self.apply(context, arguments);
//   };
// }
  