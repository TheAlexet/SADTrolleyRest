var product = require('./shoppingProduct.js');
var trolley = require('./shoppingTrolley.js');
var mongoClient = require('./mongoClient.js');

//Function used for testing the asynchronous code for the trolley (Step 4)
//Function made async to be able to use await inside
exports.testShoppingTrolley = async function() {
    console.log("\n---------------------------  Starting Asynchronous Code Testing. ---------------------------\n");
    
    //To start with we insert the products in the database and we need to wait for it to complete otherwise 
    //we would not be able to check if there is enough stock to add the product to our trolley
    const productsInserted = await mongoClient.insertProducts();
    console.log(productsInserted);

    console.log("\n------------------------------ WELCOME TO MERCADONA ------------------------------\n");

    //We create the products we will test with
    var product1 = new product(1, "Agua", "Bronchales 12L", 2.35, 2);
    var product2 = new product(2, "Pizza barbacoa", "Pizza barbacoa Casa Tarradellas", 2.93, 1);
    var product3 = new product(3, "Ron Captain Morgan", "Arrrrrrrrrrrrrrggg", 7.25, 10);
    var product4 = new product(4, "Platano", "De Canarias", 0.45, 3);

    //We create a trolley that starts off with water inside (product1)
    var myTrolley = new trolley([product1])

    console.log("\n------------------------------ YOUR TROLLEY ------------------------------\n");

    console.log(myTrolley.toString())

    console.log("\n------------------------------  I'm starving. Gotta buy some pizza. ------------------------------\n");

    //We add the Pizza and it has to check the stock so we wait for it to finish before continuing.
    try {
        const addingResult = await myTrolley.addProductDB(product2);
    }catch(err){
        console.log(err.message);
    }
    
    //There was enough stock so it added correctly
    console.log(myTrolley.toString());

    console.log("\n------------------------------  I wanna be the pirate king. Need to find some crewmates. ------------------------------\n");

    //We add the Rum and it has to check the stock so we wait for it to finish before continuing.
    try {
        const addingResult = await myTrolley.addProductDB(product3);
    }catch(err){
        console.log(err);
    }

    //We want 10 bottles of rum but there are only 5. Not enough stock so product is not added.
    console.log(myTrolley.toString());

    console.log("\n------------------------------  Not hungry anymore. ------------------------------\n");

    //We remove the Pizza
    myTrolley.removeProduct(2);
    console.log(myTrolley.toString());

    console.log("\n------------------------------  Water is for ducks. ------------------------------\n");

    //We remove the Water
    myTrolley.removeProduct(1);
    console.log(myTrolley.toString());

    console.log("\n------------------------------  I want bananas. ------------------------------\n");

    //We add the bananas and it has to check the stock so we wait for it to finish before continuing.
    try {
        const addingResult = await myTrolley.addProductDB(product4);
    }catch(err){
        console.log(err);
    }

    //There was enough stock so it added correctly
    console.log(myTrolley.toString());

    console.log("\n------------------------------  Asynchronous Code Tested. ------------------------------\n");
}