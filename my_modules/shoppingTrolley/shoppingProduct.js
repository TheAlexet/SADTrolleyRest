module.exports = class Product {

    /**
     * Creates a new product
     * @param  {Number} id The product id
     * @param  {String} pName The product name
     * @param  {String} description The product description
     * @param  {Number} price The product price  
     * @param  {Number} amount The product amount
     */
    constructor(id, pName, description, price, amount) {
        this.id = id;
        this.pName = pName;
        this.description = description;
        this.price = price;
        this.amount = amount;
    }

    /**
     * Returns the product id
     */
    get id() {
        return this._id;
    }

    /**
     * Modifies the product id
     * @param  {Number} newId The new id
     */
    set id(newId) {
        this._id = newId;
    }

    /**
     * Returns the product name
     */
    get name() {
        return this._pName;
    }

    /**
     * Modifies the product name
     * @param  {String} newpName The new product name
     */
    set pName(newpName) {
        this._pName = newpName
    }

    /**
     * Returns the product description
     */
    get description() {
        return this._description;
    }

    /**
     * Modifies the product description
     * @param  {String} newDescription The new description
     */
    set description(newDescription) {
        this._description = newDescription
    }

    /**
     * Returns the product price
     */
    get price() {
        return this._price;
    }

    /**
     * Modifies the product price
     * @param  {Number} newPrice The new price
     */
    set price(newPrice) {
        this._price = newPrice
    }

    /**
     * Returns the product amount; that is, the number of products of the same type that are inside the trolley
     */
    get amount() {
        return this._amount;
    }

    /**
     * Modifies the product amount
     * @param  {Number} newAmount The new amount
     */
    set amount(newAmount) {
        this._amount = newAmount;
    }

    /**
     * Returns a string with the product features in the following format:
     * "ID: 1, pName: Water, description: You have to drink it, price: 0.5, amount: 3."
     */
    toString() {
        return "ID: " + this._id + 
               ", pName: " + this._pName + 
               ", description: " + this._description + 
               ", price: " + this._price + 
               ", amount: " + this._amount + "."
    }
}