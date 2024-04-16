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

    if (!products[0].hasOwnProperty("price")) {
        throw new Error("Entry in products array must have a price key!");
    }

    if (typeof products[0].price !== "number") {
        throw new Error("Product's key price must be of type number!");
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

    if (!person.hasOwnProperty("firstName") || !person.hasOwnProperty("lastName")) {
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

    if (!students[0].hasOwnProperty("name") || !students[0].hasOwnProperty("grades")) {
        throw new Error("Entry in students array must have name and grades key!");
    }

    if (typeof students[0].name !== "string") {
        throw new Error("Key name of student object must be of type string!");
    }

    if (typeof students[0].grades !== "object") {
        throw new Error("Key grades of student object must be of type object!");
    }

    if (students[0].grades[0] === undefined) {
        throw new Error("Key grades of student object must be a filled array!");
    }

    if (typeof students[0].grades[0] !== "number") {
        throw new Error("Key grades of student object must be an array of numbers!");
    }
}

// Task 3: Closures and Higher-Order Functions


export { calculateDiscountedPrice, calculateTotalPrice, getFullName, filterUniqueWords, getAverageGrade };