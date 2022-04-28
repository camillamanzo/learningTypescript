//! GENERICS
const names: Array<string | number> = []; //? <> specifies the type of array

const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('this is done!');
    }, 2000);
});

//! CREATING OWN GENERICS
//? standard to strar from t and continue the alphabet (each letter is a different type)
//? adding extends object below so ts understands that every value must be of type object
function merge<T extends object, U extends object>(objA: T, objB: U) { //* merge(objA: object, objB: object) better than this version
    return Object.assign(objA, objB);
}
// console.log(merge({name: 'cami'}, {age: 24})); //* output: merged objects
const mergedObj = merge({name: 'cami'}, {age: 24}); //? with generics ts understands that the result will be an intersection of specific types
// console.log(mergedObj.name); //* works cause we used generics 

interface Lengthy {
    length: number;
}
function countAndDescribe<T extends Lengthy>(el: T): [T, string] { //* saying that the return type must be an array with type T and string
    let descriptionText = 'Got no value';
    if(el.length === 1) {
        descriptionText = 'Got one element'
    } else if (el.length > 1) {
        descriptionText = 'Got ' + el.length + ' elements.'
    } return [el, descriptionText];
    
}
// console.log(countAndDescribe('Hi there!'))
// console.log(countAndDescribe('')) 
// console.log(countAndDescribe(['hello', 'hi', 'hola']))

function extactAndConvert<T extends object, U extends keyof T>( //? keyof: 2nd parameter in the function must be the key of the value wanted
    obj: T, 
    key: U
) {
    return 'Value: ' + obj[key];
};
extactAndConvert({ name: 'cami' }, 'name');

class DataStorage<T extends string | number | boolean> { //*  removeItem doesnt work properly with objects
    private data: T[] = [];
    addItem(item: T) {
        this.data.push(item);
    }
    removeItem(item:  T) {
        if(this.data.indexOf(item) === -1)
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage<string>();
textStorage.addItem('cami');
textStorage.addItem('hola');
textStorage.removeItem('cami');
// console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(33);
// console.log(numberStorage.getItems());

// const objStorage = new DataStorage<object>(); //* removed since we added estends as that function wouldnt work with objects
// objStorage.addItem({name: 'cami'})
// objStorage.addItem({name: 'hola'})
// objStorage.removeItem({name: 'cami'})
// console.log(objStorage.getItems());

//! GENERIC UTILITY TYPES
//? partials opens and readonly closes
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}
function createCourseGoal(
    title: string,
    description: string, 
    date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {}; //? partial: makes CourseGoal a type of which's params are optional
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal; //* added 'as coursegoal' as it would be type partial otherwise
}
const names2: Readonly<string[]> = ['max', 'cami'];
// names2.push('hola'); //* doesnt work as is readonly
// names2.pop('max'); //* doesnt work as is readonly