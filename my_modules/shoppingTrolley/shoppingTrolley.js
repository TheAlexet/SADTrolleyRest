var mongoClient = require ('./mongoClient.js');

module.exports = class Trolley {

    /**
     * Creates a new trolley
     * @param  {Product[]} products The list of products of the trolley
     */
    constructor(products) {
        this.products = products == undefined ? [] : products;
    }

    /**
     * Returns the list of products added to the trolley
     */
    get products() {
        return this._products;
    }

    /**
     * Modifies the list of products added to the trolley
     * @param  {Product[]} newProducts The new list of products of the trolley
     */
    set products(newProducts) {
        this._products = newProducts;
    }

    /**
     * Returns a string with the products of the trolley in the following format:
     * "Your trolley: Water, Cocacola, Juice."
     */
    toString() {
        var productsList = "Your trolley: ";
        this._products.map((product, index) => {
            if(index === this.products.length - 1) {
                productsList += product._pName + ".";
            } else {
                productsList += product._pName + ", ";
            }
        })
        return productsList;
    }

    /**
     * Adds a new product to the trolley.
     * @param  {Product} newProduct The new product that needs to be added to the trolley.
     */
    addProduct(newProduct) {
        //Check if the newProduct is already in the trolley, by checking its id
        var productsList = this._products;
        var alreadyInTrolley = this._products.length == 0 ? false : productsList.filter(product => product.id === newProduct.id).length > 0 ? true : false;

        if(alreadyInTrolley) { //If already in the trolley, add amounts
            var productIndex = productsList.findIndex(product => product.id === newProduct.id);
            productsList[productIndex].amount += newProduct.amount;
        } else { //If the product is new, add the product instead
            productsList = productsList.push(newProduct);
        }
        console.log("--- PRODUCT ADDED ---\n");
    }

    /**
     * Removes a product from the trolley.
     * @param  {Number} productId The id of the product that needs to be removed from the trolley.
     */
    removeProduct(productId) {
        //Check if the product with id === productId is already in the trolley
        var productsList = this._products;
        var productInTrolley = productsList.filter(product => product.id === productId).length > 0 ? true : false;

        if(productInTrolley) { //If product in the trolley, remove product
            var productIndex = productsList.findIndex(product => product.id === productId);
            productsList = productsList.splice(productIndex, 1);
            console.log("--- PRODUCT REMOVED ---\n");
        }
    }

    /**
     * Adds a new product to the trolley, taking into account the product stock in the database, using async-await.
     * @param  {Product} newProduct The new product that needs to be added to the trolley.
     */
    async addProductDB(newProduct) {
        try{
        //Check if the newProduct is already in the trolley, by checking its id
            var productsList = this._products == undefined ? [] : this._products;
            var targetProduct = this._products == undefined ? false : productsList.filter(product => product.id === newProduct.id);
            var alreadyInTrolley = targetProduct.length > 0 ? true : false;
            var thereIsStock = await mongoClient.checkStock(newProduct.id, newProduct.amount);
            console.log("--- CHECKING STOCK ---\n");
            if(thereIsStock){
                if(alreadyInTrolley) { //If already in the trolley, add amounts
                    var productIndex = productsList.findIndex(product => product.id === newProduct.id);
                    productsList[productIndex].amount += newProduct.amount;
                } else { //If the product is new, add the product instead
                    productsList = productsList.push(newProduct);
                }
                console.log("--- PRODUCT ADDED ---\n");
            
            } else{
                console.log("--- NO STOCK AVAILABLE ---\n");
            } 
        } catch (error) {
            console.log(error)
        }     
    }
}