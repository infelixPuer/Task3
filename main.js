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

export { calculateDiscountedPrice, calculateTotalPrice };