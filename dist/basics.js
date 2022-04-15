"use strict";
//! basics: working with basic core types
function add(n1, n2, showResult, phrase) {
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    return result;
}
var number1 = 11;
var number2 = 15.5;
var printResult = true;
var resultPhrase = 'The result is: ';
// add(number1, number2, printResult, resultPhrase);
//! OBJECTS, ARRAYS, TUPLES
var person = {
    name: 'Camilla',
    age: 24,
    hobbies: ['chess', 'drawing'],
    role: [2, 'author'] // specified it is a tupLe otherwise it would treat it as an array
};
person.role.push('admin'); // push works with tuples but it is the only way to insert a third value in it
var favoriteActivities; //array of strings
favoriteActivities = ['discovering', 'hiking'];
// console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    // console.log(hobby.toUpperCase);
}
//! ENUMS
// enum Role { ADMIN = 5, READ_ONLY, AUTHOR}; you assign the number 5 to admin instead of the default number 0
// enum Role { ADMIN = 'admin', READ_ONLY, AUTHOR}; you assign the string admin
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
; // same thing as the commented code below
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
var person2 = {
    name: 'Camilla',
    age: 24,
    hobbies: ['chess', 'drawing'],
    role: Role.ADMIN, // instead of writing: role: ADMIN (uses enums)
};
if (person2.role === Role.ADMIN) {
    // console.log('is admin')
}
function combine(input1, //* same as number | string but with alias 
input2, //* same as number | string but with alias 
resultConversion //adding 3rd parameter in case the number is passed as a string
) {
    var result;
    if (typeof input1 === 'number' &&
        typeof input2 === 'number' ||
        resultConversion === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
    // if(resultConversion === 'as-number') {
    //     return +result //* same as return parseFloat(result)
    // } else {
    //     return result.toString();
    // }
}
var combinedAges = combine(30, 26, 'as-number');
var combinedStringAges = combine('30', '26', 'as-number');
var combinedNames = combine('mila', 'shiro', 'as-text');
// console.log(combinedAges);
// console.log(combinedStringAges);
// console.log(combinedNames);
//! VOID 
//? void means that the function does not have a return value
function add2(n1, n2) {
    return n1 + n2;
}
function printResult2(num) {
    console.log('result: ' + num);
}
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
var combineValues; //* saying that it is a function and that accepts 2 parameters and returns a number
combineValues = add2;
// console.log(combineValues(8,8))
// printResult2(add2(5, 12));
addAndHandle(10, 20, function (result) {
    // console.log(result);
});
//! UNKNOW
//? similar to any but less flexible
var userInput;
var userName;
userInput = 5;
userInput = 'cami';
// userName = userInput //* throws an error with unknown if if check not implemented
if (typeof userInput === 'string') {
    userName = userInput;
}
//! NEVER
//? makes it explicit that a function is meant to never return anything and to crash the script
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
// generateError('An error has occurred!', 500);
