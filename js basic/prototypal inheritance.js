/*
	Object.create(Parent.prototype) vs Child.prototype = new Parent()
*/

// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass

// Rectangle.prototype = Object.create(Shape.prototype);	// need to call the parent constructor to inherit instance methods
Rectangle.prototype = new Shape();					
// Rectangle.prototype = Object.create(Shape);		// will not work, no move method on the rect


Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle? ' + (rect instanceof Rectangle)); // true
console.log('Is rect an instance of Shape? ' + (rect instanceof Shape)); // true
console.log(rect.x, rect.y);
rect.move(1, 1); // Outputs, 'Shape moved.'
console.log(rect.x, rect.y);