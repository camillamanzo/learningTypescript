//! INTERFACES
interface Person { //* const Person = {} would be an object
    name: string; //*can't have a default value
    age: number;
    greet(phrase:string): void; //* a function (not obliged to add parameters)
}
let user1: Person;
user1 = {
    name: 'cami',
    age: 24,
    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
}
// user1.greet('Hola, I am');

//! INTERFACES INHERITANCE (CLASSES & INTERFAECES)
interface Named {
    readonly name?: string; //? not possible to state private and public (only one available is readonly)
    outputName?: string; //* putting '?' means it can exist but is not mandatory (optional)
}
interface Greetable extends Named{ //* sub classes must have both name and greet()
    greet(phrase:string): void;
}

class Person2 implements Greetable { //* other interfaces can be added with a comma (not possible in classes)
    name?: string; //* obliged to use the same structure as interface implemented
    age = 24; //* you can also add more parameters
    constructor(n?:string) { //? for non optional remove '?' and initialize without condition
        if(n) { //?because name is optional 
            this.name = n;
        }
    }
    greet(phrase: string) { //* obligatory bacause used in greetable
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        }
        console.log('hola!')
    }
}
let user2: Greetable;
let user3: Greetable;

user2 = new Person2();
// user2.greet(''); //* output: 'hola!' cause we didnt provide a name
user3 = new Person2('camilla')
// user3.greet('hola, I am') //*output: 'hola i am camilla cause name is provided
// console.log(user2)

//! INTERFACES AS FUNCTIONS
// type addFn = (a: number, b: number) => number;
interface addFn { //* quicker to use custom function type (ex above) but nice alternative
    (a: number, b: number): number //* method that takes 2 numbers and returns a number
}

let add5: addFn;
add5 = (n1:number, n2: number) => {
    return n1 + n2;
}