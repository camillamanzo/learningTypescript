//! ARROW FUNCTIONS
let add3 = (a: number, b: number = 5 ) => a + b; //* the equals inside the function sets a default value so you only need one paramenter to call it
let printResult3 = (output: number | string) => console.log(output)
// printResult3(add3(5, 8));

//! SPREAD
const hobbies = ['drawing', 'reading'];
const favoriteHobbies = ['playing chess', ...hobbies]; //* same thing as below but faster
favoriteHobbies.push(...hobbies); //* the spear operator takes the values inside the array instead of the array
// console.log(favoriteHobbies);

const person3 = {
    firstName: 'camilla',
    age: 24
}
const copiedPerson3 = {...person3};

//! REST PARAMETERS
//* creating an add function that takes as many numbers as you give it
//* using the reduce js function to separate each number and add it (the 0 is the number it starts from)
//?The reduce() method executes a user-supplied "reducer" callback function on each element of the array, 
//?in order, passing in the return value from the calculation on the preceding element.

let add4 = (...numbers: number[])=>{
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedNumbers = add4(1,2,3,4,5,6,7,8,9);
// console.log(addedNumbers);

//! DESTRUCTURING
//* pulling elements out of arrays or objects and creating new consts or lets
const [hobby1, hobby2, ...remainingHobbies] = favoriteHobbies;
// console.log(favoriteHobbies, hobby1, hobby2);

const {firstName, age} = person3;
// console.log(firstName, age)

