// importing necessary modules
const express = require('express'); // importing express framework
const path = require("path"); // importing path module for working with files and directiory paths
const http = require("http"); // importing the http module for creating server
const socketio = require("socket.io");  // importing socket.io module for Live-chat
// const cors = require("cors"); // importing cors for cross origin resource sharing

// Calls the express function "express()" and puts new Express application inside the app variable
const app = express(); 
const con = require('./database/db'); //importing database connection 


// app.use(cors());  // middleware setting up app for cross origin sharing
// Setting the middleware for json objects
// parse incoming Request Object as a JSON Object
app.use(express.json());

// Setting the routes to for different purposes
const customerRoutes = require('./routes/customer');
const sellerRoutes = require("./routes/seller");
const productRoutes = require("./routes/products");

// middleware for serving static images stored in images folder
app.use("/images", express.static(path.resolve(__dirname, "images")));
app.use("/invoices", express.static(path.resolve(__dirname, "invoices")));

app.use(express.static(path.join(__dirname, 'Frontend')));

app.use('/seller', sellerRoutes);
app.use('/customer', customerRoutes);
app.use('/product', productRoutes);


// creating http server
const server = http.createServer(app);

// importing chat configuration 
require("./chat")(server);

// whatever is in the environment variable PORT, or 3000 if there's nothing there.
const port = process.env.port || 3000; 

// server is listening on port process.env.port or 3000
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to The DB of BidsArt!");
  server.listen(port, () => console.log(`Server running on port ${port}`));
});
 