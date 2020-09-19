const express = require('express');
const customerAuth = require('../Middleware/verify-customer');
const customerLogin = require('../controllers/customer-login.controller');
const customerRegister = require('../controllers/customer-signup.controller');
const customerFetch = require("../controllers/fetch-customer.controller");

const Router = express.Router();

Router.get('/details/:id',customerAuth,customerFetch.getCustomerById);

Router.get('/details', customerFetch.getAllCustomers);

Router.post('/login',customerLogin.customerLogin);

Router.post('/signup', customerRegister.createCustomer);

module.exports = Router;