"use strict";
//! ARROW FUNCTIONS
let add3 = (a, b = 5) => a + b; //* the equals inside the function sets a default value so you only need one paramenter to call it
let printResult3 = (output) => console.log(output);
// printResult3(add3(5, 8));
//! SPREAD
const hobbies = ['drawing', 'reading'];
const favoriteHobbies = ['playing chess', ...hobbies]; //* same thing as below but faster
favoriteHobbies.push(...hobbies); //* the spear operator takes the values inside the array instead of the array
// console.log(favoriteHobbies);
const person3 = {
    firstName: 'camilla',
    age: 24
};
const copiedPerson3 = Object.assign({}, person3);
//! REST PARAMETERS
//* creating an add function that takes as many numbers as you give it
//* using the reduce js function to separate each number and add it (the 0 is the number it starts from)
//?The reduce() method executes a user-supplied "reducer" callback function on each element of the array, 
//?in order, passing in the return value from the calculation on the preceding element.
let add4 = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedNumbers = add4(1, 2, 3, 4, 5, 6, 7, 8, 9);
// console.log(addedNumbers);
//! DESTRUCTURING
//* pulling elements out of arrays or objects and creating new consts or lets
const [hobby1, hobby2, ...remainingHobbies] = favoriteHobbies;
// console.log(favoriteHobbies, hobby1, hobby2);
const { firstName, age } = person3;
// console.log(firstName, age);
//! OOP: OBJECT ORIENTED PROGRAMMING
//? working with real-life entities in code (productList/ product/ shoppingCart -like vue components)
class Department {
    // protected employees2: string[] = []; //* protected is accessible from subclasses
    constructor(n) {
        this.employees = []; //* private is only accessible from inside that class (not even from sub classes)
        this.name = n;
    }
    static createEmployee(name) {
        return { name: name };
    }
    describe() {
        console.log('Department: ' + this.name); //* *this* referes to an instance based on department class
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmplyeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2022; //*static property is available without instanciating 
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
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    } //*added readonly to not be changed by assignation
    describe() {
        console.log(`Department (${this.id}): ${this.name}`);
    }
}
const accountingCopy = new DepartmentCopy('id1', 'accountingCopy');
// accountingCopy.describe();
//! INHERITANCE
class ITDepartment extends DepartmentCopy {
    constructor(id, admins) {
        super(id, 'IT'); //?super can be used to reference base class properties and the base class constructor
        this.admins = admins; //* to be removed writing 'public admins: string []' in constructor
    }
}
const it = new ITDepartment('id2', ['cami']);
// it.describe();
//! GETTERS AND SETTERS
class AccountingDepartment extends DepartmentCopy {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('no report found');
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error('please pass in a valid value');
        }
        this.addReport(value);
    }
    describe() {
        console.log('Accounting department - ID: ' + this.id);
    }
    addReport(text) {
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
class DepartmentCopy2 {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees2 = [];
    }
}
//! SINGLETONS PRIVATE AND CONSTRUCTORS
class ITDepartment2 extends DepartmentCopy2 {
    constructor(id, admins) {
        super(id, 'IT'); //?super is used to reference base class properties and the base class constructor
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ITDepartment2('id', []); //* private constructor only accessible inside the class
        return this.instance;
    }
    describe() {
        console.log('IT department -ID: ' + this.id);
    }
}
const it2 = ITDepartment2.getInstance();
console.log(it2);
