import {Person} from './model/Person';

let app = function () {
    var person = new Person('Christoph', 'Burgdorf');
    //console.log(christoph.fullName);
    return person.fullName;
};

document.write(app());