"use strict";
var user1;
user1 = {
    name: 'cami',
    age: 24,
    greet: function (phrase) {
        console.log(phrase + ' ' + this.name);
    }
};
var Person2 = /** @class */ (function () {
    function Person2(n) {
        this.age = 24; //* you can also add more parameters
        if (n) { //?because name is optional 
            this.name = n;
        }
    }
    Person2.prototype.greet = function (phrase) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        }
        console.log('hola!');
    };
    return Person2;
}());
var user2;
var user3;
user2 = new Person2();
// user2.greet(''); //* output: 'hola!' cause we didnt provide a name
user3 = new Person2('camilla');
var add5;
add5 = function (n1, n2) {
    return n1 + n2;
};
