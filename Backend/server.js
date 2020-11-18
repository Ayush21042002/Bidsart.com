// importing necessary modules
const express = require('express');
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const cors = require("cors");

// Calls the express function "express()" and puts new Express application inside the app variable
const app = express(); 
const con = require('./database/db');

app.use(cors());
// Setting the middleware for json objects
// parse incoming Request Object as a JSON Object
app.use(express.json());

// Setting the routes to for different purposes
const customerRoutes = require('./routes/customer');
const sellerRoutes = require("./routes/seller");
const productRoutes = require("./routes/products");


app.use("/images", express.static(path.resolve(__dirname, "images")));


app.use('/seller', sellerRoutes);
app.use('/customer', customerRoutes);
app.use('/', productRoutes);



const server = http.createServer(app);

// Chatting while auction

require("./chat")(server);

// whatever is in the environment variable PORT, or 3000 if there's nothing there.
const port = process.env.port || 3000; 

// server is listening on port process.env.port or 3000
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to The DB of BidsArt!");
  server.listen(port, () => console.log(`Server running on port ${port}`));
});
 