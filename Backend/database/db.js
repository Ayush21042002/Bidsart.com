const mysql = require('mysql');

// Making a connection with the mysql server in my system
// Connection object to the database bidsart
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yash2000",
  database: "bidsart",
  multipleStatements: true
});

module.exports = con;