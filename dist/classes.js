"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
//! ARROW FUNCTIONS
var add3 = function (a, b) {
    if (b === void 0) { b = 5; }
    return a + b;
}; //* the equals inside the function sets a default value so you only need one paramenter to call it
var printResult3 = function (output) { return console.log(output); };
// printResult3(add3(5, 8));
//! SPREAD
var hobbies = ['drawing', 'reading'];
var favoriteHobbies = __spreadArray(['playing chess'], hobbies, true); //* same thing as below but faster
favoriteHobbies.push.apply(//* same thing as below but faster
favoriteHobbies, hobbies); //* the spear operator takes the values inside the array instead of the array
// console.log(favoriteHobbies);
var person3 = {
    firstName: 'camilla',
    age: 24
};
var copiedPerson3 = __assign({}, person3);
//! REST PARAMETERS
//* creating an add function that takes as many numbers as you give it
//* using the reduce js function to separate each number and add it (the 0 is the number it starts from)
//?The reduce() method executes a user-supplied "reducer" callback function on each element of the array, 
//?in order, passing in the return value from the calculation on the preceding element.
var add4 = function () {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (curResult, curValue) {
        return curResult + curValue;
    }, 0);
};
var addedNumbers = add4(1, 2, 3, 4, 5, 6, 7, 8, 9);
// console.log(addedNumbers);
//! DESTRUCTURING
//* pulling elements out of arrays or objects and creating new consts or lets
var hobby1 = favoriteHobbies[0], hobby2 = favoriteHobbies[1], remainingHobbies = favoriteHobbies.slice(2);
// console.log(favoriteHobbies, hobby1, hobby2);
var firstName = person3.firstName, age = person3.age;
// console.log(firstName, age);
//! OOP: OBJECT ORIENTED PROGRAMMING
//? working with real-life entities in code (productList/ product/ shoppingCart -like vue components)
var Department = /** @class */ (function () {
    // protected employees2: string[] = []; //* protected is accessible from subclasses
    function Department(n) {
        this.employees = []; //* private is only accessible from inside that class (not even from sub classes)
        this.name = n;
    }
    Department.createEmployee = function (name) {
        return { name: name };
    };
    Department.prototype.describe = function () {
        console.log('Department: ' + this.name); //* *this* referes to an instance based on department class
    };
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.printEmplyeeInfo = function () {
        console.log(this.employees.length);
        console.log(this.employees);
    };
    Department.fiscalYear = 2022; //*static property is available without instanciating 
    return Department;
}());
var accounting = new Department('accounting');
var employee1 = Department.createEmployee('cami');
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
var DepartmentCopy = /** @class */ (function () {
    function DepartmentCopy(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    } //*added readonly to not be changed by assignation
    DepartmentCopy.prototype.describe = function () {
        console.log("Department (".concat(this.id, "): ").concat(this.name));
    };
    return DepartmentCopy;
}());
var accountingCopy = new DepartmentCopy('id1', 'accountingCopy');
// accountingCopy.describe();
//! INHERITANCE
var ITDepartment = /** @class */ (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(id, admins) {
        var _this = _super.call(this, id, 'IT') || this;
        _this.admins = admins; //* to be removed writing 'public admins: string []' in constructor
        return _this;
    }
    return ITDepartment;
}(DepartmentCopy));
var it = new ITDepartment('id2', ['cami']);
// it.describe();
//! GETTERS AND SETTERS
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment(id, reports) {
        var _this = _super.call(this, id, 'Accounting') || this;
        _this.reports = reports;
        _this.lastReport = reports[0];
        return _this;
    }
    Object.defineProperty(AccountingDepartment.prototype, "mostRecentReport", {
        get: function () {
            if (this.lastReport) {
                return this.lastReport;
            }
            throw new Error('no report found');
        },
        set: function (value) {
            if (!value) {
                throw new Error('please pass in a valid value');
            }
            this.addReport(value);
        },
        enumerable: false,
        configurable: true
    });
    AccountingDepartment.prototype.describe = function () {
        console.log('Accounting department - ID: ' + this.id);
    };
    AccountingDepartment.prototype.addReport = function (text) {
        this.reports.push(text);
        this.lastReport = text;
    };
    AccountingDepartment.prototype.printReports = function () {
        console.log(this.reports);
    };
    return AccountingDepartment;
}(DepartmentCopy));
var accountingCopy2 = new AccountingDepartment('id2', []);
accountingCopy2.mostRecentReport = 'Year End Report'; //* log below doesnt throw an error if setter is added
// console.log(accountingCopy2.mostRecentReport); //* throws an error cause no report has been added yet
accountingCopy2.addReport('Something went so well i\'m amazed');
// accountingCopy2.describe();
// accountingCopy2.printReports();
// accountingCopy2.describe(); //*shows a different outcome after having overwritten the describe method
//!ABSTRACT SINGLETONS PRIVATE, CONSTRUCTORS
var DepartmentCopy2 = /** @class */ (function () {
    function DepartmentCopy2(id, name) {
        this.id = id;
        this.name = name;
        this.employees2 = [];
    }
    return DepartmentCopy2;
}());
//! SINGLETONS PRIVATE AND CONSTRUCTORS
var ITDepartment2 = /** @class */ (function (_super) {
    __extends(ITDepartment2, _super);
    function ITDepartment2(id, admins) {
        return _super.call(this, id, 'IT') || this;
    }
    ITDepartment2.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ITDepartment2('id', []); //* private constructor only accessible inside the class
        return this.instance;
    };
    ITDepartment2.prototype.describe = function () {
        console.log('IT department -ID: ' + this.id);
    };
    return ITDepartment2;
}(DepartmentCopy2));
var it2 = ITDepartment2.getInstance();
console.log(it2);
