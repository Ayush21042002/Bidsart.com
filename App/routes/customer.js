// Here all the routes having http://localhost:3000/customer prefix will be handled

const express = require('express');
const customerAuth = require('../Middleware/verify-customer');
const customerLogin = require('../controllers/customer-login.controller');
const customerRegister = require('../controllers/customer-signup.controller');
const customerFetch = require("../controllers/fetch-customer.controller");
const customerUpdate = require("../controllers/update-customer.controller")
const fetchAuctions = require("../controllers/fetch-auctions.controller");
const placeOrder = require("../controllers/order-place.controller");
const fetchOrder = require("../controllers/fetch-orders.controller");
const makePayment = require("../controllers/payment.controller");
const Router = express.Router();

Router.get('/details',customerAuth,customerFetch.getCustomerById);

Router.get('/myAuctions',customerAuth,fetchAuctions.getAuctionByCustomerId);

Router.get('/allCustomers', customerFetch.getAllCustomers);

Router.get('/myOrders',customerAuth,fetchOrder.fetchOrdersByCustomerId);

Router.get('/success/:id',makePayment.successHandler);

Router.get('/cancel',makePayment.cancelHandler);

Router.post('/login',customerLogin.customerLogin);

Router.post('/signup', customerRegister.createCustomer);

Router.put('/update',customerAuth,customerUpdate.updateCustomer) ;

Router.post('/order',customerAuth,placeOrder.placeOrder);

Router.post('/pay',customerAuth,makePayment.makePayment);

module.exports = Router;