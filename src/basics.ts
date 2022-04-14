//! basics: working with basic core types
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
    const result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    } return result;
}
const number1 = 11;
const number2 = 15.5;
const printResult = true;
const resultPhrase = 'The result is: '
// add(number1, number2, printResult, resultPhrase);

//! OBJECTS, ARRAYS, TUPLES
const person : { // only specifing because of tupe otherwise the first part is redundant
    name: string,
    age: number,
    hobbies: string[],
    role: [number, string] // this is telling TS that this is a tuPlE, and that it has 2 el: number and string
} = {
    name: 'Camilla',
    age: 24,
    hobbies: ['chess', 'drawing'],
    role: [2, 'author'] // specified it is a tupLe otherwise it would treat it as an array
}
person.role.push('admin') // push works with tuples but it is the only way to insert a third value in it

let favoriteActivities: string[]; //array of strings
favoriteActivities = ['discovering', 'hiking']
// console.log(person.name);
for(const hobby of person.hobbies){
    // console.log(hobby.toUpperCase);
}

//! ENUMS
// enum Role { ADMIN = 5, READ_ONLY, AUTHOR}; you assign the number 5 to admin instead of the default number 0
// enum Role { ADMIN = 'admin', READ_ONLY, AUTHOR}; you assign the string admin
enum Role { ADMIN, READ_ONLY, AUTHOR}; // same thing as the commented code below
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
const person2 = {
    name: 'Camilla',
    age: 24,
    hobbies: ['chess', 'drawing'],
    role: Role.ADMIN, // instead of writing: role: ADMIN (uses enums)
}
if(person2.role === Role.ADMIN){
    // console.log('is admin')
}

//! UNION TYPES & ALIASES
type Combinable = number | string;

function combine(
    input1: Combinable, //* same as number | string but with alias 
    input2: Combinable, //* same as number | string but with alias 
    resultConversion: 'as-number' | 'as-text' //adding 3rd parameter in case the number is passed as a string
) {
    let result;

    if( typeof input1 === 'number' && 
        typeof input2 === 'number' || 
        resultConversion === 'as-number'
    ){
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    } 
    return result;
    // if(resultConversion === 'as-number') {
    //     return +result //* same as return parseFloat(result)
    // } else {
    //     return result.toString();
    // }
}
const combinedAges = combine(30, 26, 'as-number');
const combinedStringAges = combine('30', '26', 'as-number');
const combinedNames = combine('mila', 'shiro', 'as-text');
// console.log(combinedAges);
// console.log(combinedStringAges);
// console.log(combinedNames);

//! VOID 
//? void means that the function does not have a return value
function add2(n1: number, n2: number) {
    return n1 + n2
}
function printResult2(num: number): void { // adding void to be clear (TS does it on its onw) 
    console.log('result: ' + num)
}
function addAndHandle(n1: number, n2:number, cb: (num: number) => void) { //?cb (callback)
    const result = n1 + n2;
    cb(result);
}
let combineValues : (a: number, b: number) => number; //* saying that it is a function and that accepts 2 parameters and returns a number
combineValues = add2;
// console.log(combineValues(8,8))
// printResult2(add2(5, 12));
addAndHandle(10, 20, (result) => {
    // console.log(result);
})

//! UNKNOW
//? similar to any but less flexible
let userInput: unknown;
let userName: string;
userInput = 5;
userInput = 'cami'
// userName = userInput //* throws an error with unknown if if check not implemented
if(typeof userInput === 'string') {
    userName = userInput
}

//! NEVER
//? makes it explicit that a function is meant to never return anything and to crash the script
function generateError(message: string, code: number): never {
    throw { message: message, errorCode: code }
}
// generateError('An error has occurred!', 500);
