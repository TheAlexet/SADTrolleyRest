var mgdb=require('mongodb');
var assert = require('assert');

var mongoclient = mgdb.MongoClient;

var url='mongodb+srv://dbUser:dbUserPassword@cluster0.oiahf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

var collection;


//Function used to check if there is enough stock of a product to add it to the trolley
//Function made using promises
exports.checkStock = function(productId, number){
  return new Promise((resolve,reject) => {
    //We connect to the database
    mongoclient.connect(url,function (err,db) {
      assert.equal(err,null);
      //We create a database object to be able to use it
      var dbo = db.db('shopping'); 
      var collection = dbo.collection('products');
      //We search the required product in the database
      collection.find({id: productId}).toArray(function(err, productsList){ 
        var result = productsList[0];
        var amount = result.amount;
        //The result of the promise is a boolean telling if the stock in the database is bigger than the amount asked
        resolve(number < amount); 
        db.close();
      });
      
    });
  });
}

//Function used to add products to the database
//Function made using promises
exports.insertProducts = function() {
  return new Promise((resolve, reject) => {
    //We connect to the database
    mongoclient.connect(url,function (err,db) {
      assert.equal(err,null);
      //We create a database object to be able to use it
      var dbo = db.db('shopping');
      // Get the products collection
      collection = dbo.collection('products');
      //Clean the database
      collection.deleteMany({});
      // Insert some products
      collection.insertMany([
        {id: 1, pName: "Agua", description: "Bronchales 12L", price: 2.35, amount: 5}, 
        {id: 2, pName: "Pizza barbacoa", description: "Pizza barbacoa Cassa Tarradellas", price: 2.93, amount: 5}, 
        {id: 3, pName: "Ron Captain Morgan", description: "Arrrrrrrrrrrrrrggg", price: 7.25, amount: 5},
        {id: 4, pName: "Platano", description: "De Canarias", price: 0.45, amount: 5},
        {id: 5, pName: "Mascarilla", description: "#Stay home", price: 0.5, amount: 5}
      ], function(err, result) {
        assert.equal(err, null);
        //The promise returns a message telling that the addition of the products was succesful
        resolve("Inserted 5 products into the collection");
        db.close();
      });
    });
  });
}