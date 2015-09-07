import {Person} from './model/Person';

let app = function () {
    var person = new Person('Christoph', 'Burgdorf');
    return person.fullName;
};

document.write(app());