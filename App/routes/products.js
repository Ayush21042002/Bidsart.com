// Here all the routes having http://localhost:3000/ prefix will be handled

const express = require('express');
const sellerAuth = require('../Middleware/verify-seller');
const bookAuction = require("../controllers/book-auction.controller");
const customerAuth = require("../Middleware/verify-customer");
const extractFile = require('../Middleware/file-upload');
const fetchProducts = require('../controllers/fetch-products.controller');
const addProduct = require("../controllers/add-product.controller");
const registerAuction = require("../controllers/register-auction.controller");
const fetchAuctions = require("../controllers/fetch-auctions.controller");
const deleteauction = require("../controllers/delete-auction.controller");
const updateAuction = require("../controllers/update-auction.controller");
const updateProduct = require("../controllers/update-product.controller");
const Router = express.Router();

// Get Request
Router.get('/', fetchProducts.getAllProducts);

Router.get("/newArrival",fetchProducts.getNewProducts);

Router.get("/allAuctions",fetchAuctions.getAllAuctions);

Router.get('/:id', fetchProducts.getProductByProductId);

Router.get("/getAuctionsByProduct/:productId",fetchAuctions.getAuctionByProductId);

Router.get("/getProductByAuctionId/:aid",fetchProducts.getProductByAuctionId);


// Post requests
Router.post('/addProduct', sellerAuth,extractFile,addProduct.addProduct);

Router.post("/registerauction", sellerAuth, registerAuction.registerAuction);

Router.post("/bookAuction",customerAuth,bookAuction.bookAuction);


// Put requests
Router.put('/updateProduct/:id', sellerAuth,updateProduct.updateProduct);

Router.put("/updateAuction/:id",sellerAuth,updateAuction.updateAuction);

// Delete requests
Router.delete("/deleteauction/:auctionId",sellerAuth,deleteauction.deleteAuctionByAuctionId);

Router.delete("/deleteauctions/:productId", sellerAuth, deleteauction.deleteAuctionsByProductId);

module.exports = Router;