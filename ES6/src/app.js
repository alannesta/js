import {Person} from './features/basic-class'

let person = new Person('Alan', 'Cao');

let div = document.createElement('div');
div.innerHTML = person.fullName;
document.getElementsByTagName('body')[0].appendChild(div);
