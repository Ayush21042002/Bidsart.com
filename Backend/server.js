// importing necessary modules
const express = require('express');

// Calls the express function "express()" and puts new Express application inside the app variable
const app = express(); 
const con = require('./database/db');
// Setting the middleware for json objects
// parse incoming Request Object as a JSON Object
app.use(express.json());

// Setting the routes to for different purposes
const customerRoutes = require('./routes/customer');
const sellerRoutes = require("./routes/seller");
const productRoutes = require("./routes/products");

app.use('/seller', sellerRoutes);
app.use('/', productRoutes);
app.use('/customer', customerRoutes);

// whatever is in the environment variable PORT, or 3000 if there's nothing there.
const port = process.env.port || 3000; 

// server is listening on port process.env.port or 3000
con.connect(function (err) {
  if (err) throw err;
  app.listen(port, () => console.log(`Server running on port ${port}`));
  console.log("Connected to The DB of BidsArt!");
});
 