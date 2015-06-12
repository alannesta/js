function Parent() {
    this.instanceMethod = function() {
        console.log('instance method');
    }
}

Parent.prototype.staticMethod = function() {
    console.log('static method');
};

function Child() {
    Parent.apply(this, arguments);
}

var test;

/*
* Returns expr1 if it can be converted to false; otherwise, returns expr2.
* Thus, when used with Boolean values, && returns true if both operands are true; otherwise, returns false.
*
* */

//var proto = Parent && Parent.prototype;     // Parent.prototype
var proto = test && Parent.prototype;   // undefined

console.log(proto);

/*
* Returns expr1 if it can be converted to true; otherwise, returns expr2.
* Thus, when used with Boolean values, || returns true if either operand is true; if both are false, returns false.
* */

function executed() {
    console.log('I am executed');
    return 'executed'
}

function notExecuted() {
    console.log('I will not be executed');
    return 'not executed';
}

executed() || notExecuted();    // only the first expression is evaluated
executed() && notExecuted();    // both function will run


//Child.prototype = Object.create(proto);
//var child = new Child();
//for (var key in child) {
//    console.log(key);
//}
//console.log(child);


