const express = require('express');
const con = require('../database/db');
const sellerAuth = require('../Middleware/verify-seller');
const bookAuction = require("../controllers/book-auction.controller");
const customerAuth = require("../Middleware/verify-customer");
const extractFile = require('../Middleware/file-upload');
const fetchProducts = require('../controllers/fetch-products.controller');
const addProduct = require("../controllers/add-product.controller");
const deleteProduct = require("../controllers/delete-product.controller");
const registerAuction = require("../controllers/register-auction.controller");
const fetchAuctions = require("../controllers/fetch-auctions.controller");
const deleteauction = require("../controllers/delete-auction.controller");
const updateAuction = require("../controllers/update-auction.controller");
const Router = express.Router();

// Get Request
Router.get('/', fetchProducts.getAllProducts);


Router.get("/allAuctions",fetchAuctions.getAllAuctions);

Router.get('/:id', fetchProducts.getProductByProductId);

Router.get("/sellerProducts/:sellerId",fetchProducts.getAllProductsBySeller);

Router.get("/getAuctionsByProduct/:productId",fetchAuctions.getAuctionByProductId);


// Post requests
Router.post('/addProduct', sellerAuth,extractFile,addProduct.addProduct);

Router.post("/registerauction", sellerAuth, registerAuction.registerAuction);

Router.post("/bookAuction",customerAuth,bookAuction.bookAuction);


// Put requests
Router.put('/updateProduct/:id', sellerAuth,extractFile,(req,res) => {
    // Here the update request for product will be handled
});

Router.put("/updateAuction",sellerAuth,updateAuction.updateAuction);

Router.put("/updateAuctionDetails",sellerAuth,updateAuction.updateAuction);

// Delete requests

Router.delete('/deleteProduct/:id', sellerAuth,deleteProduct.deleteProductbyId);

Router.delete("/deleteauction/:auctionId",sellerAuth,deleteauction.deleteAuctionByAuctionId);

Router.delete("/deleteauctions/:productId", sellerAuth, deleteauction.deleteAuctionsByProductId);

module.exports = Router;