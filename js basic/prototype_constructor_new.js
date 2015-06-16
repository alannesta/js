var Parent = function(name) {
    this.name = name || 'parent';
};
Parent.prototype.getName = function() {
    return this.name;
};

var Child = function() {
    Parent.apply(this, arguments);
};

Child.prototype = new Parent();   // almost the same as Object.create(Parent.prototype), has 'name' attribute on child.__proto__
//Child.prototype = Object.create(Parent.prototype);  // equivalent of above, no 'name' attribute on child.__proto__

Child.prototype.constructor = Child;



var childInstance = new Child('child');

//console.log(childInstance.__proto__);

//console.log(childInstance.__proto__ === Child.prototype);  // true
//console.log(Child.prototype.__proto__ === Parent.prototype);    // true
//console.log(childInstance.__proto__.__proto__ === Parent.prototype);    // true
//
//console.log(Child.prototype.constructor);     // if not specified, it will be 'function Parent()', which is incorrect
//console.log(Child.__proto__ === Function.prototype);    // true
//
//console.log(Parent.prototype.constructor === Parent);   // true
//console.log(Parent.prototype.__proto__ === Object.prototype);   // true
//console.log(Parent.prototype.constructor.__proto__ === Function.prototype);    // true
//console.log(Parent.__proto__ === Function.prototype);   // true

