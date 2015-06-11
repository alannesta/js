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

var square = Object.create(rectangle);
//var square = Object.create(new Rectangle());      // all props on square's prototype
//var square = Object.create(Rectangle.prototype);  // only 'perimeter' is inherited on square's prototype
//var square = _.extend({}, rectangle);     // all props become square's 'own' property


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
    console.log('-------- List property ---------------------');
    console.log('Object.keys() ---> ', Object.keys(obj));
    console.log('getOwnPropertyNames() ---> ', Object.getOwnPropertyNames(obj));
}



/**
 *
 * @param {object} obj
 * @description
 * demonstrate that "for...in..." loop will go up alone the prototype chain
 */
function forInLoopDescriptorAndProperty(obj) {
    console.log('---------for in loop -----------');
    for (var key in obj ) {
        if (obj.hasOwnProperty(key)) {
            console.log('hasOwnProperty: ---> ' + key);
        }else{
            console.log('enumerable props from prototype chain ---> ' + key);
        }
        console.log('getOwnPropertyDescriptor ---> ' + key, Object.getOwnPropertyDescriptor(obj, key));
    }
}

function getOwnPropertyNamesDescriptorAndProperty(obj) {
    console.log('--------- get own property names -----------');
    Object.getOwnPropertyNames(obj).forEach(function(key) {
        if (obj.hasOwnProperty(key)) {
            console.log('hasOwnProperty: ---> ' + key);
        }else{
            console.log('enumerable props from prototype chain ---> ' + key);
        }
        console.log('getOwnPropertyDescriptor ---> ' + key, Object.getOwnPropertyDescriptor(obj, key));
    });
}

//forInLoopDescriptorAndProperty(rectangle);
forInLoopDescriptorAndProperty(square);
//getProperties(rectangle);
getOwnPropertyNamesDescriptorAndProperty(square);

