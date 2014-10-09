/*
	Prototype inheritance in Javascript

	Explanation: 如果我在一个实例中找某一个属性，这个实例中没有，那就会到它的原型中去找。原型也是一个对象，它也有自己的原型对象，所以就行成了一个链，实例自己的原型中找不到，那就到原型的原型对象中去找，一直向上延伸到Object的原型对象，默认我们创建的函数的原型对象它自己的原型对象是指向Object的原型对象的，所以这就是为什么我们可以在我们的自定义构造函数的实例上调用Object的方法（toString, valueOf)
*/
function Person(name, age){
	this.name = name,
	this.age = age,
	this.sayName = function(){
		console.log(this.name);
	}
}

Person.prototype.getAge = function(){
	console.log(this.age);
}

function Coder(name, age){
	this.name = name,
	this.age = age,
	this.getInfo = function(){
		console.log("name: "+name+", age: "+age);
	}
}
	
Coder.prototype = new Person();		//the key to prototype inheritance---> point the child's prototype to parent's

var coder = new Coder("Markelov", 100);

coder.getAge();		// 100 ---> method inherited from parent prototype
coder.getInfo();	// object's own method

