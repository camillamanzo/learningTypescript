"use strict";
//! GENERICS
const names = []; //? <> specifies the type of array
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('this is done!');
    }, 2000);
});
//! CREATING OWN GENERICS
//? standard to strar from t and continue the alphabet (each letter is a different type)
//? adding extends object below so ts understands that every value must be of type object
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
// console.log(merge({name: 'cami'}, {age: 24})); //* output: merged objects
const mergedObj = merge({ name: 'cami' }, { age: 24 }); //? with generics ts understands that the result will be an intersection of specific types
function countAndDescribe(el) {
    let descriptionText = 'Got no value';
    if (el.length === 1) {
        descriptionText = 'Got one element';
    }
    else if (el.length > 1) {
        descriptionText = 'Got ' + el.length + ' elements.';
    }
    return [el, descriptionText];
}
// console.log(countAndDescribe('Hi there!'))
// console.log(countAndDescribe('')) 
// console.log(countAndDescribe(['hello', 'hi', 'hola']))
function extactAndConvert(//? keyof: 2nd parameter in the function must be the key of the value wanted
obj, key) {
    return 'Value: ' + obj[key];
}
;
extactAndConvert({ name: 'cami' }, 'name');
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1)
            this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('cami');
textStorage.addItem('hola');
textStorage.removeItem('cami');
// console.log(textStorage.getItems());
const numberStorage = new DataStorage();
numberStorage.addItem(33);
function createCourseGoal(title, description, date) {
    let courseGoal = {}; //? partial: makes CourseGoal a type of which's params are optional
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal; //* added 'as coursegoal' as it would be type partial otherwise
}
const names2 = ['max', 'cami'];
// names2.push('hola'); //* doesnt work as is readonly
// names2.pop('max'); //* doesnt work as is readonly
