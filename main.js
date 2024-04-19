// Task 1: Immutability and Pure Functions
function calculateDiscountedPrice(products, diskPercentage) {
    let newProducts = [];

    checkProducts(products);
    checkDiskPercentage(diskPercentage);

    for (let i = 0; i < products.length; ++i) {
        newProducts.push({
            name: products[i].name,
            price: Number.parseFloat((products[i].price - products[i].price * diskPercentage).toFixed(2))
        });
    }

    return newProducts;
}

function calculateTotalPrice(products) {
    let totalPrice = 0;

    checkProducts(products);

    products.forEach(product => totalPrice += product.price);

    return Number.parseFloat(totalPrice.toFixed(2));
}

// helper functions
function checkProducts(products) {
    const productsType = typeof products;

    if (productsType !== "object") {
        throw new Error("Parameter products must be of type object!");
    }

    if (products[0] === undefined) {
        throw new Error("Parameter products must be a filled array with objects!");
    }

    for (let i = 0; i < products.length; ++i) {
        if (!"price" in products[i]) throw new Error("Entry in products array must have a price key!");
    }

    for (let i = 0; i < products.length; ++i) {
        if (typeof products[i].price !== "number") throw new Error("Product's key price must be of type number!");
    }
}

function checkDiskPercentage(diskPercentage) {
    const diskPercentageType = typeof diskPercentage;

    if (diskPercentageType !== "number") {
        throw new Error("Parameter diskPercentage must be of type number!");
    }

    if (diskPercentage <= 0  || diskPercentage >= 1) {
        throw new Error("Parameter diskPercentage must be greater than 0 and less than 1!");
    }
}

// Task 2: Function Composition and Point-Free Style
function getFullName(person) {
    let fullName = "";

    checkPerson(person);

    fullName += person.firstName;
    fullName += " " + person.lastName;

    return fullName;
}

function filterUniqueWords(text) {
    if (typeof text !== "string") {
        throw new Error("Parameter text must be a string!");
    }

    if (text.length === 0) {
        throw new Error("Parameter text must not be an empty string!");
    }

    let wordsArray = text.split(" ");

    return wordsArray.filter(word => wordsArray.indexOf(word) === wordsArray.lastIndexOf(word)).sort();
}

function getAverageGrade(students) {
    checkStudents(students);

    let gradesSum= 0;
    let gradesNumber = 0;

    function getSumGrades(grade) {
        gradesSum += grade;
        ++gradesNumber;
    }

    students.forEach(student => student.grades.forEach(grade => getSumGrades(grade)));

    return Number.parseFloat((gradesSum / gradesNumber).toFixed(2));
}

// helper functions
function checkPerson(person) {
    const personType = typeof person;

    if (personType !== "object") {
        throw new Error("Parameter person must be of type object!");
    }

    if (!("firstName" in person) || !("lastName" in person)) {
        throw new Error("Parameter person must have firstName and lastName keys!");
    }

    if (person.firstName === undefined || person.lastName === undefined) {
        throw new Error("Person's keys firstName and lastName must be defined!");
    }
}

function checkStudents(students) {
    const studentsType = typeof students;

    if (studentsType !== "object") {
        throw new Error("Parameter students must be of type object!");
    }

    if (students[0] === undefined) {
        throw new Error("Parameter students must be a filled array!");
    }

    for (let i = 0; i < students.length; ++i) {
        if (!("name" in students[i]) || !("grades" in students[i]))
            throw new Error("Entry in students array must have name and grades key!");
    }

    for (let i = 0; i < students.length; ++i) {
        if (typeof students[i].name !== "string")
            throw new Error("Key name of student object must be of type string!");
    }

    for (let i = 0; i < students.length; ++i) {
        if (typeof students[i].grades !== "object")
            throw new Error("Key grades of student object must be of type object!");
    }

    for (let i = 0; i < students.length; ++i) {
        if (students[i].grades[0] === undefined)
            throw new Error("Key grades of student object must be a filled array!");
    }

    for (let i = 0; i < students.length; ++i) {
        if (typeof students[i].grades[0] === "number")
            throw new Error("Key grades of student object must be an array of numbers!");
    }
}

// Task 3: Closures and Higher-Order Functions
function createCounter() {
    let counter = 0;

    return () => {
        return ++counter;
    }
}

function repeatFunction(func, num) {
    checkFunc(func);
    checkNum(num);

    return () => {
        for (let i = 0; i < num; ++i) {
            func();
        }
    }
}

// helper functions
function checkFunc(func) {
    if (typeof func !== "function") {
        throw new Error("Parameter func must be of type function!");
    }
}

function checkNum(num) {
    if (typeof num !== "number") {
        throw new Error("Parameter num must be of type number!");
    }

    if (num % 1 !== 0) {
        throw new Error("Parameter num must be an integer number!");
    }
}

// Task 4: Recursion and Tail Call Optimization
function calculateFactorial(num) {
    if (typeof num !== "number") {
        throw new Error("Parameter num must be of type number!");
    }

    if (num % 1 !== 0) {
        throw new Error("Parameter num must ne an integer number!");
    }

    return factIterator(num, 1);
}

function factIterator(num, product) {
    if (num === 1) return product;

    return factIterator(num - 1, num * product);
}

function power(base, exponent) {
    checkBaseExponent(base, exponent);

    return powerIterator(base, exponent);
}

function powerIterator(base, exponent, product = 1) {
    if (exponent === 0) return product;
    if (exponent < 0) return powerIterator(base, exponent + 1, product / base);

    return powerIterator(base, exponent - 1, product * base);
}

// helper functions

function checkBaseExponent(base, exponent) {
    if (typeof base !== "number") {
        throw new Error("Parameter base must be of type number!");
    }

    if (base % 1 !== 0) {
        throw new Error("Parameter base must ne an integer number!");
    }

    if (typeof exponent !== "number") {
        throw new Error("Parameter exponent must be of type number!");
    }

    if (exponent % 1 !== 0) {
        throw new Error("Parameter exponent must ne an integer number!");
    }

}

// Task 5: Lazy Evaluation and Generators
function lazyMap(array, mapFunc) {
    let iterator = 0;
    return {
        next: function generator(){
            if (iterator < array.length) {
                array[iterator] = mapFunc(array[iterator++]);
                let result = array[iterator];
                return { value: result, done: false };
            }

            return { done: true };
        }
    }
}

function fibonacciGenerator() {
    let value1= 0, value2 = 1;
    return {
        next: function() {
            let result = value1;
            [value1, value2] = [value2, value1 + value2];
            return { value: result };
        }
    }

}

export { calculateDiscountedPrice, calculateTotalPrice, getFullName, filterUniqueWords, getAverageGrade, createCounter, repeatFunction, calculateFactorial, power, lazyMap, fibonacciGenerator };