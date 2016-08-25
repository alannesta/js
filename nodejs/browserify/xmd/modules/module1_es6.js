import {module2} from './module2_es6'

export const module1 = function() {
	"use strict";
	module2();
	console.log('module1 run');
};
