import "babel-polyfill"
import {Person} from './features/basic-class'
import IDMaker from './features/generator'

let person = new Person('Alan', 'Cao');

let idMaker = IDMaker();
var id = 0;

let div = document.createElement('div');

while((id = idMaker.next().value) < 10) {
	let div = document.createElement('div');
	div.innerHTML = id;
	document.getElementsByTagName('body')[0].appendChild(div);

}

div.innerHTML = person.fullName;
document.getElementsByTagName('body')[0].appendChild(div);
