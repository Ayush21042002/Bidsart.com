const express = require('express');
const sellerAuth = require('../Middleware/verify-seller');
const sellerSignup = require("../controllers/seller-signup.controller");
const sellerLogin = require("../controllers/seller-login.controller");
const Router = express.Router();

Router.get('/:id',sellerAuth, (req,res) => {
    // Here the seller details will be sent to seller
});

Router.post('/login',sellerLogin.sellerLogin);

Router.post('/signup', sellerSignup.createSeller);

module.exports = Router;