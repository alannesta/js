var Parent = function(name) {
    this.name = name || 'parent';
};
Parent.prototype.getName = function() {
    return this.name;
};

var Child = function() {
    Parent.apply(this, arguments);
};

Child.prototype = new Parent();
//Child.prototype.constructor = Child;

var childInstance = new Child('child');

console.log(childInstance.__proto__ === Child.prototype);  // true
console.log(Child.prototype.constructor);     // if not specified, it will be 'function Parent()', which is incorrect
console.log(Parent.prototype.constructor === Parent);   // true
console.log(childInstance.__proto__.__proto__ === Parent.prototype);    // true
console.log(Child.prototype.__proto__ === Parent.prototype);    // true