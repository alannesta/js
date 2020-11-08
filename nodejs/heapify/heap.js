const Heapify = require('heapify');


const size = 100 * 100 * 100;
const numberRange = 100 * 100 * 100 * 100 * 100;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const key = [];
const priority = [];
for (let i = 0; i < size; i++) {
    key.push(i);
    priority.push(getRandomInt(0, numberRange));
}
// console.log(key);
now =  new Date().getTime();
const heap = new Heapify(size, key, priority);
console.log(new Date().getTime() - now);