import {Person} from './features/basic-class';
import showName from './features/basic-function-export';

let app = function () {
    var person = new Person('Alan', 'Cao');
    return person.fullName;
};

document.write(app());
document.write('</p>');
document.write(showName(app()));
