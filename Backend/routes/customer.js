const express = require('express');
const customerAuth = require('../Middleware/verify-customer');
const customerLogin = require('../controllers/customer-login.controller');
const customerRegister = require('../controllers/customer-signup.controller');

const Router = express.Router();

Router.get('/customerDetails/:id', customerAuth ,(req,res) => {
    // Here the customer Details will be sent for the particular id
});

Router.post('/login',customerLogin.customerLogin);

Router.post('/signup', customerRegister.createCustomer);

module.exports = Router;