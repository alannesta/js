/*
* Note that the for...in loop is already only iterating enumerable items,
* so one should not assume based on the lack of non-enumerable properties shown in the loop that hasOwnProperty
* itself is confined strictly to enumerable items (as with Object.getOwnPropertyNames()).
*
* */

var _ = require('underscore');
var chalk = require('chalk');

/*
*
* The inheritance way
* */

// old school inheritance
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    this.area = function() {
        return this.height * this.width;
    }
}

Rectangle.prototype.perimeter = function() {
    return (this.width + this.height) * 2;
};

function Square() {
    var self = this;
    Rectangle.apply(self, arguments);   // parent constructor
}

Square.prototype = new Rectangle();
Square.prototype.isSquare = function() {
    return this.width === this.height;
};


function UnknownShape() {
    var self = this;
    Square.apply(self, arguments);
}
UnknownShape.prototype = new Square();


var rectangle = new Rectangle(100, 100);
var square = new Square(100, 100);
var unknownShape = new UnknownShape(100, 100);

// Object.create()
//var square = Object.create(rectangle);
//var square = Object.create(new Rectangle());      // all props on square's prototype
//var square = Object.create(Rectangle.prototype);  // only 'perimeter' is inherited on square's prototype

/*
* The 'mixin' way
*
* */

// underscore extend
//var square = _.extend({}, rectangle);     // all props become square's 'own' property


//TODO: Object.assign()


/*
*
* Test method
* */
function getProperties(obj) {
    console.log(chalk.blue('-------- List property ---------------------'));
    console.log('Object.keys() ---> ', Object.keys(obj));   // no prototype prop
    console.log('getOwnPropertyNames() ---> ', Object.getOwnPropertyNames(obj));    // no prototype prop
}



/**
 *
 * @param {object} obj
 * @description
 * demonstrate that "for...in..." loop will go up alone the prototype chain
 */
function forInLoopDescriptorAndProperty(obj) {
    console.log(chalk.blue('---------for in loop -----------'));

    /*
     *   for..in... will traverse properties on the object's prototype (or prototype chain)
     * */
    for (var key in obj ) {
        if (obj.hasOwnProperty(key)) {
            console.log('hasOwnProperty: ---> ' + chalk.red(key));
        }else{
            console.log('enumerable props from prototype chain ---> ' + chalk.red(key));
        }
        console.log('getOwnPropertyDescriptor ---> ' + chalk.red(key), Object.getOwnPropertyDescriptor(obj, key));
    }
}

function getOwnPropertyNamesDescriptorAndProperty(obj) {
    console.log('--------- get own property names -----------');

    /*
    *   getOwnPropertyNames will NOT get properties on the object's prototype (or prototype chain)
    * */
    Object.getOwnPropertyNames(obj).forEach(function(key) {
        if (obj.hasOwnProperty(key)) {
            console.log('hasOwnProperty: ---> ' + chalk.red(key));
        }else{
            console.log('enumerable props from prototype chain ---> ' + chalk.red(key));
        }
        console.log('getOwnPropertyDescriptor ---> ' + chalk.red(key), Object.getOwnPropertyDescriptor(obj, key));
    });
}

//forInLoopDescriptorAndProperty(rectangle);
//forInLoopDescriptorAndProperty(square);
//forInLoopDescriptorAndProperty(unknownShape);

//getProperties(rectangle);
//getProperties(unknownShape);

//getOwnPropertyNamesDescriptorAndProperty(square);
getOwnPropertyNamesDescriptorAndProperty(unknownShape);