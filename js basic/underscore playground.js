var _ = require('underscore');

var upperscore = {};

var objArr = [{name: "1", age: 22}, {name: "2", age: 44}, {name: "3", age: 33}, {name: "4", age: 22}]
var obj = {name: "2", age: 44};

//console.log(_.contains(objArr, obj));	// false
//objArr.push(obj);
//console.log(_.contains(objArr, obj));	// true

// _.pluck: _.pluck(list, propertyName)
// A convenient version of what is perhaps the most common use-case for map: extracting a list of property values.
upperscore.pluck = function(list, prop) {
  if (Array.prototype.map){
      return list.map(function(item){
          return item[prop];
      });
  }else {
      var result = [];
      for (var i = 0; i < list.length; i++) {
          result.push(list[i][prop]);
      }
      return result;
  }
};

// example:

var list = [{name: 12, age: 13, time: 14}, {name: 12, age: 13, time: 14}, {name: 12, age: 13, time: 14}];

Array.prototype.map = undefined;
console.log(upperscore.pluck(list, 'name'));


// _.pick: _.pick(object, *keys)
// Return a copy of the object, filtered to only have values for the whitelisted keys (or array of valid keys).
// Alternatively accepts a predicate indicating which keys to pick.
upperscore.pick = function(object, keys) {
    var obj = {};

    var allKeys = Array.prototype.slice.call(arguments, 1);

    if (allKeys[0] instanceof Array) {
        allKeys = allKeys[0];
    }

    allKeys.forEach(function(key) {
        if (object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
    });
    return obj;
};

// Example:

var testObj = {
    prop1: 123,
    prop2: '456',
    prop3: 789
};
console.log(upperscore.pick(testObj, ['prop3', 'prop2', 'prop1']));
console.log(upperscore.pick(testObj, 'prop3', 'prop1'));
