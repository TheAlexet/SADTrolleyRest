var product = require('./shoppingProduct.js');
var trolley = require('./shoppingTrolley.js');

//Function used for testing the synchronous code for the trolley (Step 2 - Before adding database functions)

exports.testShoppingTrolley = function() {
    console.log("\n---------------------------  Starting Synchronous Code Testing. ---------------------------\n");

    console.log("\n------------------------------ WELCOME TO MERCADONA ------------------------------\n");

    //We create the products we will test with
    var product1 = new product(1, "Agua", "Bronchales 12L", 2.35, 2);
    var product2 = new product(2, "Pizza barbacoa", "Pizza barbacoa Casa Tarradellas", 2.93, 1);
    var product3 = new product(3, "Ron Captain Morgan", "Arrrrrrrrrrrrrrggg", 7.25, 1);

    //We create a trolley that starts off with water inside (product1)
    var myTrolley = new trolley([product1])

    console.log("\n------------------------------ PRODUCTS STOCK ------------------------------\n");

    //We print the products to show the products overwritten toString method
    console.log(product1.toString());
    console.log(product2.toString());
    console.log(product3.toString());

    console.log("\n------------------------------ YOUR TROLLEY ------------------------------\n");

    //We print the trollet to show the trolley's overwritten toString method
    console.log(myTrolley.toString());

    console.log("\n------------------------------  I'm starving. Gotta buy some pizza. ------------------------------\n");

    //We add Pizza Barbacoa (product2) to the trolley
    myTrolley.addProduct(product2);

    //We can see how the addition is reflected in the trolley
    console.log(myTrolley.toString());

    console.log("\n------------------------------  I wanna be the pirate king. Need to find some crewmates. ------------------------------\n");

    //We add Rum (product3) to the trolley
    myTrolley.addProduct(product3);

    //We can see how the addition is reflected in the trolley
    console.log(myTrolley.toString());

    console.log("\n------------------------------  Not hungry anymore. ------------------------------\n");

    //We remove Pizza Barbacoa (product2) from the trolley
    myTrolley.removeProduct(2);

    //We can see how the removal is reflected in the trolley
    console.log(myTrolley.toString());

    console.log("\n------------------------------  Water is for ducks. ------------------------------\n");

    //We remove water (product1) from the trolley
    myTrolley.removeProduct(1);

    //We can see how the removal is reflected in the trolley
    console.log(myTrolley.toString());

    console.log("\n------------------------------  Synchronous Code Tested. ------------------------------\n");
}