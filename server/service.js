const express = require('express');
const ServiceRegistry = require('./lib/ServiceRegistry');
const Trolley = require('../my_modules/shoppingTrolley/shoppingTrolley');
const Product = require('../my_modules/shoppingTrolley/shoppingProduct');

var registeredTrolley = false;
var trolley = new Trolley();

const service = express();


module.exports = (config) => {
  const log = config.log();
  const serviceRegistry = new ServiceRegistry(log);
  // Add a request logging middleware in development mode
  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  //If the trolley is not registered yet, it is registered.
  service.put('/trolley', (req, res) => {
    if(!registeredTrolley){
      serviceRegistry.register('sad', '1.0.0', 'localhost', '3000');
      registeredTrolley = true;
      res.send("The trolley has been registered.");
    } else {
      res.send("The trolley is already registered");
    }
  });

  //Returns the trolley if it is registered.
  service.get('/trolley', (req, res) => {
    if(!registeredTrolley){
      return res.send('Trolley is not registered');
    } else {
      res.send(trolley);
    }
  });

  //Adds a product to the stock, given its id and with a certain amount
  service.post('/trolley/:id/:amount', (req, res) => {
    if(!registeredTrolley){
      return res.send('Trolley is not registered');
    } else {
      var pName = null;
      var description = null;
      var price = null;
      switch (req.params.id) {
        case "1":
          pName = "Agua";
          description = "Bronchales 12L";
          price = "2.35";
          break;
        case "2":
          pName = "Pizza barbacoa";
          description = "Pizza barbacoa Cassa Tarradellas";
          price = "2.93";
          break;
        case "3":
          pName = "Ron Captain Morgan";
          description = "Arrrrrrrrrrrrrrggg";
          price = "7.25";
          break;
        case "4":
          pName = "Platano";
          description = "De Canarias";
          price = "0.45";
          break;
        case "5":
          pName = "Mascarilla";
          description = "#StayHome";
          price = "0.5";
          break;
        default:
          return res.send('Product unavailable.');
      }
      var id = parseInt(req.params.id);
      var amount = parseInt(req.params.amount);
      var product = new Product(id, pName, description, price, amount);
      trolley.addProductDB(product);
      setTimeout(()=>{res.send(trolley);},2000);
    }
  });

  //Removes a product from the stock, given its id
  service.delete('/trolley/:id', (req, res) => {
    if(!registeredTrolley){
      return res.send('Trolley is not registered');
    } else {
      var pName = null;
      var description = null;
      var price = null;
      switch (req.params.id) {
        case "1":
          pName = "Agua";
          description = "Bronchales 12L";
          price = "2.35";
          break;
        case "2":
          pName = "Pizza barbacoa";
          description = "Pizza barbacoa Cassa Tarradellas";
          price = "2.93";
          break;
        case "3":
          pName = "Ron Captain Morgan";
          description = "Arrrrrrrrrrrrrrggg";
          price = "7.25";
          break;
        case "4":
          pName = "Platano";
          description = "De Canarias";
          price = "0.45";
          break;
        case "5":
          pName = "Mascarilla";
          description = "Bronchales 12L";
          price = "2.35";
          break;
      
        default:
          return res.send("Product unavailable");
      }
      var id = parseInt(req.params.id);
      trolley.removeProduct(id);
      res.send(trolley);
    }
  });

  service.delete('/trolley', (req, res) => {
    if(!registeredTrolley){
      return res.send('Trolley is not registered');
    } else {
      serviceRegistry.unregister('sad', '1.0.0', 'localhost', '3000');
      res.send('Trolley unregistered succesfully');
      registeredTrolley = false;
      trolley = new Trolley();
    }
  });

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return service;
};
