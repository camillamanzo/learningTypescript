"use strict";
let user1;
user1 = {
    name: 'cami',
    age: 24,
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
};
class Person2 {
    constructor(n) {
        this.age = 24; //* you can also add more parameters
        if (n) { //?because name is optional 
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        }
        console.log('hola!');
    }
}
let user2;
let user3;
user2 = new Person2();
// user2.greet(''); //* output: 'hola!' cause we didnt provide a name
user3 = new Person2('camilla');
let add5;
add5 = (n1, n2) => {
    return n1 + n2;
};
