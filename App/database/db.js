// Connection with the database

const mysql = require('mysql');

// Making a connection with the mysql server in my system
// Connection object to the database bidsart
const con = mysql.createConnection({
  host: "b76dzbyvfxypt5w93wkm-mysql.services.clever-cloud.com",
  user: "uy0fzgs57hm9246q",
  password: "RPojJVNWJio24LwZOjRn", // password for AYUSH21042002 system
  // password: "yash2000" // password for yashkumar3000 system
  database: "b76dzbyvfxypt5w93wkm",
  multipleStatements: true,
});

module.exports = con;