"use strict";
//! DECORATORS
//? (use es6 and "experimentalDecorators": true)
//? decorator starts with uppercase starter
//? decorators runs when class is defined not when it is instanciated
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// function Logger(target: Function) { //* decorators use arguments (target)
//     console.log('Logging...');
//     console.log(target)
// }
function Logger(logString) {
    return function (target) {
        console.log(logString);
        console.log(target);
    };
}
function WithTemplate(template, hookId) {
    return function (constructor) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1').textContent = p.name;
        }
    };
}
// @Logger //* '@' is an identifier and 2nd word must point at a decorator (used in first example)
// @Logger('Logging - Person') //* logString
let Person = class Person {
    constructor() {
        this.name = 'camii';
        console.log('Creating a person object...');
    }
};
Person = __decorate([
    WithTemplate('<h1>Hola</h1>', 'app') //? 2nd param is the ID in index.html where it need to write
], Person);
const pers = new Person();
console.log(pers);
