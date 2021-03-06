"use strict";
// interface ElevatedEmployee extends Employee, Admin {} //* if i used interfaces (same thing as above)
const e1 = {
    name: 'camilla',
    privileges: ['create-server'],
    startDate: new Date()
};
function add6(a, b) {
    if (typeof a === 'string' || typeof b === 'string') { //?guard checks type
        return a.toString() + b.toString(); //* Either concatenate
    }
    return a + b; //* or add mathematically
}
function add7(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString(); //* Either concatenate
    }
    return a + b; //* or add mathematically
}
const result = add7('camilla', ' manzo');
result.split(' '); //? split now works cause we specified with function overload that string + string = string
function printEmployeeInfo(emp) {
    console.log('Name: ' + emp.name);
    if ('privileges' in emp) { //? guard checks if privileges is inside employee (in is available in js)
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start date: ' + emp.startDate);
    }
}
// printEmployeeInfo(e1);
// printEmployeeInfo({name: 'cami', startDate: new Date}); //*creating object on the fly
class Car {
    drive() {
        console.log('driving...');
    }
}
class Truck {
    drive() {
        console.log('driving a truck...');
    }
    loadCargo(amount) {
        console.log('loading' + amount);
    }
}
const v1 = new Car;
const v2 = new Truck;
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) { //? instanceof to see if vehicle was creadìted based on truck (only with classes - no interfaces)
        vehicle.loadCargo(1000);
    }
}
function moving(animal) {
    let speed;
    switch (animal.kind) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('moving at speed: ' + speed);
}
// moving({kind: 'bird', flyingSpeed: 15});
//! TYPE CASTING (acces DOM)
const par = document.getElementById('message-output');
// const userInputElement = <HTMLInputElement>document.getElementById('user-input'); //*same as below
const userInputElement = document.getElementById('user-input'); //* just '!' is another alternative
userInputElement.value = 'hi there!'; //*would get an error without casting above cause unsure if element exists
const errorBag = {
    email: 'not a valid email',
    username: 'must start with capital character'
};
//! OPTIONAL CHAINING OPERATOR (?)
//? used to access nested data (if undefined it stops instead of throwing an error)
const fetchedUserData = {
    id: 'u1',
    name: 'Cami',
    job: { title: 'CEO', description: 'My own company' }
};
// console.log(fetchedUserData.job.title) //* would give error if job didnt exist
// console.log(fetchedUserData?.job?.title) //? by adding question marks we are only accessing it if it exists
//! NULLISH COALESCING (fallback)
const userInput2 = null;
// const storedData = userInput2 || 'DEFAULT'; //* but if data is empty string it treats it as null (bad)
const storedData = userInput2 !== null && userInput2 !== void 0 ? userInput2 : 'DEFAULT'; //? with '??' it only takes values that are null or undefined 
