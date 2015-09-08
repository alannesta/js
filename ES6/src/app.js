import {Person} from './features/class';
import {showName} from './features/function';

let app = function () {
    var person = new Person('Alan', 'Cao');
    return person.fullName;
};

document.write(app());
document.write('</p>');
document.write(showName(app()));