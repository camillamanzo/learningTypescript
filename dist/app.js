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
    console.log('Template factory');
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(...args) {
                super(); //? to call original constructor
                console.log('Rendering template');
                const hookEl = document.getElementById(hookId);
                // const p = new originalConstructor(); //*removed as we can access with this.*
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name; //*p.name before
                }
            }
        };
    };
}
// @Logger //* '@' is an identifier and 2nd word must point at a decorator (used in first example)
// @Logger('Logging - Person') //* logString 
// @WithTemplate('<h1>Hola</h1>', 'app')//? 2nd param is the ID in index.html where it need to write
class Person {
    constructor() {
        this.name = 'camii';
        // console.log('Creating a person object...')
    }
}
// const pers = new Person();
// console.log(pers);
function Log(target, propertyName) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    // @Log2
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price - should be positive!');
        }
    }
}
function AutoBind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const boundFn = originalMethod.bind(this); //* 'this' referres to what triggers the get() (object to which we define the getter)
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'this works';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    AutoBind
], Printer.prototype, "showMessage", null);
const p = new Printer;
const button = document.querySelector('button');
const registeredValidators = {};
function Required(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...registeredValidators[target.constructor.name][propName], 'required'] });
}
function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...registeredValidators[target.constructor.name][propName], 'positive'] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        // console.log(prop);
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop]; //? '!!' return to real true or false value
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value; //? '+' converts it to a number
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('try again!');
        return;
    }
    console.log(createdCourse);
});
