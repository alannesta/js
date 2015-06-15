/*
	Object.create(Parent.prototype) vs Child.prototype = new Parent()
*/

// Shape - superclass
function Shape(x, y) {
  this.x = x;
  this.y = y;
}

// superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - subclass
function Rectangle() {
  Shape.apply(this, arguments); // call super constructor.
}

// subclass extends superclass

Rectangle.prototype = Object.create(Shape.prototype);	// need to call the parent constructor to inherit instance methods
//Rectangle.prototype = new Shape();
// Rectangle.prototype = Object.create(Shape);		// will not work, no move method on the rect


//Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle(100, 100);
//console.dir(rect);
console.log(rect.__proto__);
//console.log(rect.constructor);
console.log(rect.__proto__ === Rectangle.prototype);
//console.log(rect.__proto__.constructor === Rectangle.prototype.constructor);  // true
//console.log(Rectangle.prototype);
//console.dir(Rectangle.prototype.constructor);
//console.log(Object.getPrototypeOf(rect));


//console.log('Is rect an instance of Rectangle? ' + (rect instanceof Rectangle)); // true
//console.log('Is rect an instance of Shape? ' + (rect instanceof Shape)); // true
//console.log(rect.x, rect.y);
//rect.move(1, 1); // Outputs, 'Shape moved.'
//console.log(rect.x, rect.y);