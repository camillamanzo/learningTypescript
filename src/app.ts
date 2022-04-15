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
// console.log(firstName, age);

//! OOP: OBJECT ORIENTED PROGRAMMING
//? working with real-life entities in code (productList/ product/ shoppingCart -like vue components)
class Department { //* classes are blueprints of JS objects
    private name: string; //* this is a property (basically a variable)
    private employees: string[] = []; //* private is only accessible from inside that class (not even from sub classes)
    static fiscalYear = 2022; //*static property is available without instanciating 
    // protected employees2: string[] = []; //* protected is accessible from subclasses
    constructor(n: string) {  //* initialization work
        this.name = n;
    }
    static createEmployee(name:string) { //? static method: allows to call it from the class itself (not 'this.*')
        return {name: name}
    }
    describe(this: Department) { //* method that takes paramenter this (hint to what the this below should be referred to)
        console.log('Department: ' + this.name) //* *this* referes to an instance based on department class
    }
    addEmployee(employee: string) {
        this.employees.push(employee);
    }
    printEmplyeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees)
    }
}
const accounting = new Department('accounting');
const employee1 = Department.createEmployee('cami');
// console.log(employee1, Department.fiscalYear); //* will show an oject with an eployee with name cami and the fiscal year
accounting.addEmployee('Cami');
accounting.addEmployee('Sasso');
// accounting.employees[2] = 'hi'; //*worked before adding private which forces to use method line 61/62

// console.log(accounting);
// accounting.describe();
// accounting.printEmplyeeInfo();

// const accountingCopy = { name: 'hi', describe: accounting.describe } //*this code worked before adding employees and its methods
// accountingCopy.describe(); 

//! ANOTHER WAY TO WRITE THE CLASS ABOVE
class DepartmentCopy {
    private employees: string[] = [];
    constructor(protected readonly id: string, public name: string) {} //*added readonly to not be changed by assignation
    describe(this: DepartmentCopy) { //* method can be empty to force subclasses to have their own without a default (best practice: abstract)
        console.log(`Department (${this.id}): ${this.name}`);
    }
}
const accountingCopy = new DepartmentCopy('id1', 'accountingCopy');
// accountingCopy.describe();

//! INHERITANCE
class ITDepartment extends DepartmentCopy {
    admins: string[]; //* to be removed if writing 'public admins: string []' in constructor
    constructor(id: string, admins: string[]) {
        super(id, 'IT'); //?super can be used to reference base class properties and the base class constructor
        this.admins = admins //* to be removed writing 'public admins: string []' in constructor
    }
}
const it = new ITDepartment('id2', ['cami']);
// it.describe();

//! GETTERS AND SETTERS
class AccountingDepartment extends DepartmentCopy {
    private lastReport : string;
    get mostRecentReport() { //* get method must return something
        if(this.lastReport){
            return this.lastReport;
        }
        throw new Error('no report found');
    }
    set mostRecentReport(value: string) {
        if(!value) {
            throw new Error('please pass in a valid value');
        }
        this.addReport(value)
    }
    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }
    describe() { //*overwriting the describe() from DepartmentCopy
        console.log('Accounting department - ID: ' + this.id);
    }
    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
}
const accountingCopy2 = new AccountingDepartment('id2', []);
accountingCopy2.mostRecentReport = 'Year End Report'; //* log below doesnt throw an error if setter is added
// console.log(accountingCopy2.mostRecentReport); //* throws an error cause no report has been added yet
accountingCopy2.addReport('Something went so well i\'m amazed');
// accountingCopy2.describe();
// accountingCopy2.printReports();
// accountingCopy2.describe(); //*shows a different outcome after having overwritten the describe method

//!ABSTRACT SINGLETONS PRIVATE, CONSTRUCTORS
abstract class DepartmentCopy2 { //*if there is an abstract method you must add abstract to the class too
    private employees2: string[] = [];
    constructor(protected readonly id: string, public name: string) {} 
    abstract describe(this: DepartmentCopy) :void; //? abstract added to force each subclass to have its own describe()
}

//! SINGLETONS PRIVATE AND CONSTRUCTORS
class ITDepartment2 extends DepartmentCopy2 {
    private static instance: ITDepartment2;
    private constructor(id: string, admins: string[]) { //* private added to make sure you only create one object based on a class (ex: there is only one itdepartment)
        super(id, 'IT'); //?super is used to reference base class properties and the base class constructor
    }
    static getInstance() { //* if using private constructor you must call the method inside the class to create instance 
        if(this.instance) {
            return this.instance;
        }
        this.instance = new ITDepartment2('id', []); //* private constructor only accessible inside the class
        return this.instance;
    }
    describe() { //* abstract in the main class forces each sudclass to have its own mothod implemented (does not have a default)
        console.log('IT department -ID: ' + this.id);
    }
}
const it2 = ITDepartment2.getInstance();
console.log(it2)