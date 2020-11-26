// Here all the routes having http://localhost:3000/customer prefix will be handled

const express = require('express');
const customerAuth = require('../Middleware/verify-customer');
const customerLogin = require('../controllers/customer-login.controller');
const customerRegister = require('../controllers/customer-signup.controller');
const customerFetch = require("../controllers/fetch-customer.controller");
const customerUpdate = require("../controllers/update-customer.controller")
const fetchAuctions = require("../controllers/fetch-auctions.controller");
const Router = express.Router();

Router.get('/details',customerAuth,customerFetch.getCustomerById);

Router.get('/myAuctions',customerAuth,fetchAuctions.getAuctionByCustomerId);

Router.get('/allCustomers', customerFetch.getAllCustomers);

Router.post('/login',customerLogin.customerLogin);

Router.post('/signup', customerRegister.createCustomer);

Router.put('/update',customerAuth,customerUpdate.updateCustomer) ;

module.exports = Router;