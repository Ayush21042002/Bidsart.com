const express = require('express');
const con = require('../database/db');
const sellerAuth = require('../Middleware/verify-seller');
const extractFile = require('../Middleware/file-upload');
const fetchProducts = require('../controllers/fetch-products.controller');
const addProduct = require("../controllers/add-product.controller");
const Router = express.Router();

Router.get('/', fetchProducts.getAllProducts);

Router.get('/:id', fetchProducts.getProductByProductId);

Router.get("/sellerProducts/:sellerId",fetchProducts.getAllProductsBySeller);

Router.post('/addProduct', extractFile,addProduct.addProduct);

Router.put('/updateProduct/:id', sellerAuth,extractFile,(req,res) => {
    // Here the update request for product will be handled
});

Router.delete('/deleteProduct/:id', sellerAuth,(req,res) => {
    // Here the delete request of the product will be handled
});

module.exports = Router;