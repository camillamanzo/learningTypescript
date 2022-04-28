//! DECORATORS
//? (use es6 and "experimentalDecorators": true)
//? decorator starts with uppercase starter
//? decorators runs when class is defined not when it is instanciated

// function Logger(target: Function) { //* decorators use arguments (target)
//     console.log('Logging...');
//     console.log(target)
// }
function Logger(logString: string) {
    return function(target: Function) {
        console.log(logString);
        console.log(target);
    }
}
function WithTemplate(template: string, hookId: string) {
    console.log('Template factory')
    return function<T extends {new(..._: any[]): {name:string}}>(originalConstructor: T) { //? '_' says we do not need/use this argument even if we state it
        return class extends originalConstructor {
            constructor(...args: any[]) { //* new contructor to keep old login and add new rendered only if i instanciate 
                super(); //? to call original constructor
                console.log('Rendering template');
                const hookEl = document.getElementById(hookId);
                // const p = new originalConstructor(); //*removed as we can access with this.*
                if(hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name; //*p.name before
                }
            }
        }
    }
}

// @Logger //* '@' is an identifier and 2nd word must point at a decorator (used in first example)
// @Logger('Logging - Person') //* logString 
// @WithTemplate('<h1>Hola</h1>', 'app')//? 2nd param is the ID in index.html where it need to write

class Person { 
    name = 'camii';
    constructor() {
        // console.log('Creating a person object...')
    }
}
// const pers = new Person();
// console.log(pers);

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}
  
class Product {
    // @Log
    title: string;
    private _price: number;

    // @Log2
    set price(val: number) {
        if (val > 0) {
        this._price = val;
        } else {
        throw new Error('Invalid price - should be positive!');
        }
    }
    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    // @Log3
    // getPriceWithTax(@Log4 tax: number) {
    //     return this._price * (1 + tax);
    // }
}

function AutoBind(target: any, methodName: string, descriptor: PropertyDescriptor) { //*adding descriptor to function so that evemtlistener works
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: true,
        get() { //? method will be triggered by the object to which it belongs
            const boundFn = originalMethod.bind(this); //* 'this' referres to what triggers the get() (object to which we define the getter)
            return boundFn
        }
    }
    return adjDescriptor;
}
class Printer {
    message = 'this works';
    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}
const p = new Printer;
const button = document.querySelector('button')!;
// button.addEventListener('click', p.showMessage); //* this would give undefined as this. doesnt have the same functionality with even listeners
// button.addEventListener('click', p.showMessage.bind(p)); //* alternative solution with js
// button.addEventListener('click', p.showMessage); //* this now works because of descriptor

//! DECORATORS FOR VALIDATION
interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]; //* ex: ['required', 'positive']
    }
}
const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...registeredValidators[target.constructor.name][propName], 'required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...registeredValidators[target.constructor.name][propName], 'positive']
  };
}
function validate(obj: any) {
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
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}
const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value; //? '+' converts it to a number

    const createdCourse = new Course(title, price);
    if(!validate(createdCourse)) {
        alert('try again!');
        return;
    }console.log(createdCourse);
});