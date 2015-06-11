/*
* Note that the for...in loop is already only iterating enumerable items,
* so one should not assume based on the lack of non-enumerable properties shown in the loop that hasOwnProperty
* itself is confined strictly to enumerable items (as with Object.getOwnPropertyNames()).
*
* */

var _ = require('underscore');

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

var rectangle = new Rectangle(100, 100);

var square = Object.create(Rectangle.prototype);


//var parent = {
//    width: 100,
//    height: 100,
//    get area() {
//        return this.width * this.height;
//    }
//};
//
//Object.defineProperty(parent, 'perimeter', {
//   get: function() {
//       return (this.width + this.height) * 2;
//   }
//});

//parent.prototype.getPerimeter = function() {
//    return (this.width + this.height) * 2;
//};

function getProperties(obj) {
    console.log('Object.keys() ---> ', Object.keys(obj));
    console.log('getOwnPropertyNames() ---> ', Object.getOwnPropertyNames(obj));
    console.log('------------------------------------');
}



/**
 *
 * @param {object} obj
 */
function testEnumDescriptorAndProperty(obj) {
    for (var key in obj ) {
        console.log('---------own property-----------');
        if (obj.hasOwnProperty(key)) {
            console.log('hasOwnProperty: ---> ' + key);
        }else{
            console.log('not own propery, should be enumerable props from prototype chain ---> ' + key);
        }
        console.log('---------descriptor-----------');
        console.log('getOwnPropertyDescriptor ---> ' + key, Object.getOwnPropertyDescriptor(obj, key));
    }
}

function testUnenumDescriptorAndProperty(obj) {
    Object.getOwnPropertyNames(obj).forEach(function(key) {
        if (obj.hasOwnProperty(key)) {
            console.log('hasOwnProperty: ---> ' + key);
        }else{
            console.log('not own propery, should be enumerable props from prototype chain ---> ' + key);
        }
        console.log('---------descriptor-----------');
        console.log('getOwnPropertyDescriptor ---> ' + key, Object.getOwnPropertyDescriptor(obj, key));
    });
}

//testEnumDescriptorAndProperty(parent);
getProperties(square);
testUnenumDescriptorAndProperty(square);

