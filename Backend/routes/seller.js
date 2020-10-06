const express = require('express');
const sellerAuth = require('../Middleware/verify-seller');
const sellerSignup = require("../controllers/seller-signup.controller");
const sellerLogin = require("../controllers/seller-login.controller");
const fetchSeller = require("../controllers/fetch-seller.controller");
const Router = express.Router();


Router.get("/allSellers", fetchSeller.getAllSellers);

Router.get('/details',sellerAuth,fetchSeller.getSellerById);

Router.post('/login',sellerLogin.sellerLogin);

Router.post('/signup', sellerSignup.createSeller);

module.exports = Router;