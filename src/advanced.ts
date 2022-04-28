//! INTERSECTION TYPES
type Admin = {
    name: string;
    privileges: string[];
};
type Employee = {
    name: string;
    startDate: Date;
};
type ElevatedEmployee = Admin & Employee; //*intersection
// interface ElevatedEmployee extends Employee, Admin {} //* if i used interfaces (same thing as above)

const e1: ElevatedEmployee = {
    name: 'camilla',
    privileges: ['create-server'],
    startDate: new Date()
};

//! TYPE GUARD & FUNCTION OVERLOAD
type Combinable2 = string | number;
type Numeric = number | boolean;
type Universal = Combinable2 & Numeric; //*intersection

function add6(a: Combinable2, b: Combinable2) {
    if (typeof a === 'string' || typeof b === 'string') { //?guard checks type
        return a.toString() + b.toString(); //* Either concatenate
    }
    return a + b; //* or add mathematically
}

function add7(a: number, b: number): number; //? function overload
function add7(a: string, b: string): string; //? function overload

function add7(a: Combinable2, b: Combinable2) {
    if (typeof a === 'string' || typeof b === 'string') { 
        return a.toString() + b.toString(); //* Either concatenate
    }
    return a + b; //* or add mathematically
}
const result = add7('camilla', ' manzo');
result.split(' '); //? split now works cause we specified with function overload that string + string = string
// console.log(result);

type UnknownEmployee = Employee | Admin; //? unknown is either employee or admin
function printEmployeeInfo(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);
    if('privileges' in emp) { //? guard checks if privileges is inside employee (in is available in js)
        console.log('Privileges: ' + emp.privileges)
    }
    if('startDate' in emp) { 
        console.log('Start date: ' + emp.startDate)
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
        console.log('driving a truck...')
    }
    loadCargo(amount: number) {
        console.log('loading' + amount)
    }
}
type Vehicle = Car | Truck;
const v1 = new Car;
const v2 = new Truck;

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if(vehicle instanceof Truck) { //? instanceof to see if vehicle was creadìted based on truck (only with classes - no interfaces)
        vehicle.loadCargo(1000);
    }
}
// useVehicle(v1)
// useVehicle(v2)

//! DISCRIMINATED UNIONS    
interface Bird {
    kind: 'bird'; //?common property in every object in union to use for check
    flyingSpeed: number;
}
interface Horse {
    kind: 'horse'; //*adding literal type also for switch statement
    runningSpeed: number;
}
type Animal = Bird | Horse;

function moving(animal: Animal) {
    let speed;
    switch (animal.kind) {
        case 'bird':
            speed = animal.flyingSpeed;
            break
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('moving at speed: ' + speed);
}

// moving({kind: 'bird', flyingSpeed: 15});

//! TYPE CASTING (acces DOM)
const par = document.getElementById('message-output');
// const userInputElement = <HTMLInputElement>document.getElementById('user-input'); //*same as below
const userInputElement = document.getElementById('user-input')! as HTMLInputElement; //* just '!' is another alternative
userInputElement.value = 'hi there!' //*would get an error without casting above cause unsure if element exists

//! INDEX TYPES
interface ErrorContainer {//* to check if ex. forms are filled correctly etc
    // id: number; //* would give error 
    // id: string; //*because below we are saying that every value must be a string we cannot set anything to not string 
    [prop: string]: string; //? syntax to say that the property name is a string and its value is also a string
}
const errorBag: ErrorContainer = {
    email: 'not a valid email',
    username: 'must start with capital character'
}

//! OPTIONAL CHAINING OPERATOR (?)
//? used to access nested data (if undefined it stops instead of throwing an error)
const fetchedUserData = {
    id: 'u1',
    name: 'Cami',
    job: { title: 'CEO', description: 'My own company' }
}
// console.log(fetchedUserData.job.title) //* would give error if job didnt exist
// console.log(fetchedUserData?.job?.title) //? by adding question marks we are only accessing it if it exists

//! NULLISH COALESCING (fallback)
const userInput2 = null;
// const storedData = userInput2 || 'DEFAULT'; //* but if data is empty string it treats it as null (bad)
const storedData = userInput2 ?? 'DEFAULT'; //? with '??' it only takes values that are null or undefined 