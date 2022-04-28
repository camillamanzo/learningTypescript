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
    return function(constructor: any) { //? '(_:Function)' says we do not need/use this argument even if we state it
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if(hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

// @Logger //* '@' is an identifier and 2nd word must point at a decorator (used in first example)
// @Logger('Logging - Person') //* logString
@WithTemplate('<h1>Hola</h1>', 'app')//? 2nd param is the ID in index.html where it need to write
class Person {
    name = 'camii';
    constructor() {
        console.log('Creating a person object...')
    }
}
const pers = new Person();
console.log(pers);