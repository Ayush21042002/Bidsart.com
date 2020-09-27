const express = require('express');
const sellerAuth = require('../Middleware/verify-seller');
const sellerSignup = require("../controllers/seller-signup.controller");
const Router = express.Router();

Router.get('/:id',sellerAuth, (req,res) => {
    // Here the seller details will be sent to seller
});

Router.post('/login', (req,res) => {
    // Here the login request of seller will be handled
});

Router.post('/signup', sellerSignup.createSeller);

module.exports = Router;