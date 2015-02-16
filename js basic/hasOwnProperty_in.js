/*
	Every object descended from Object inherits the hasOwnProperty method. This method can be used to determine whether an object has the specified property as a direct property of that object.

	unlike the in operator, this method does not check down the object's prototype chain!
*/

function Person(name, age){
	this.name = name,
	this.age = age,
	this.sayName = function(){
		console.log(this.name);
	}
	this.sayAge = function(){
		console.log("age: " + this.age);
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

Coder.prototype.coderGetInfo = function(){
	console.log(this.name + ' own getInfo method on prototype');
}

var coder = new Coder("Markelov", 100);
coder.sayName();	//this is also inherited?
coder.sayAge();		//how is this inherited? look up through the prototype chain?


for (var prop in coder) {
  if (coder.hasOwnProperty(prop)) {		// prototype is not checked
    console.log("Has own property: " + prop);
  }
  else {
    console.log("in: " + prop); // everything else on the prototype chain
  }
}

/*
	Backbone style extend
*/

var extend = function(child) {
  var base = this;
  if(child) {
    for(var prop in child)  {
      base[prop] = child[prop];
    }
    for(var prop in child)  {
      base.prototype[prop] = child[prop];
    }
  }
  return base;
};