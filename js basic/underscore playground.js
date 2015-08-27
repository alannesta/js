
var upperscore = {};

var objArr = [{name: "1", age: 22}, {name: "2", age: 44}, {name: "3", age: 33}, {name: "4", age: 22}]
var obj = {name: "2", age: 44};

console.log(_.contains(objArr, obj));	// false
objArr.push(obj);
console.log(_.contains(objArr, obj));	// true

// _.pluck




// _.pick: _.pick(object, *keys)
// Return a copy of the object, filtered to only have values for the whitelisted keys (or array of valid keys).
// Alternatively accepts a predicate indicating which keys to pick.
upperscore.prototype.pick = function(object, keys) {
    var obj = {};
//        for (var key in object) {
//            if (object.hasOwnProperty(key)) {
//                if (keys.indexOf(key) > -1) {
//                    obj[key] =
//                }
//            }
//        }
    keys.forEach(function(key) {
        if (object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
    });
    return obj;
}

// Example:

