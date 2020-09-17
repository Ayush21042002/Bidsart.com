const _Bcrypt = require("bcryptjs");

const con = require('../database/db');

exports.createCustomer = (req, resp) => {
    //   console.log(req.body);
  _Bcrypt.hash(req.body.password, 10).then((hash) => {
    console.log(req.body);
    const user = {
        email: req.body.email,
        password:  hash
    }
    con.query(
      "INSERT INTO user SET ?",user,
      (err, result) => {
        if (err) throw err;
        const userId = result.insertId;
        const customer = {
            customerId: userId,
            fname: req.body.fname,
            mname: req.body.mname,
            lname: req.body.lname,
        };

        const contact = {
          customerId: userId,
          contact: req.body.contact,
          countrycode: req.body.countrycode,
        };

        con.query("INSERT INTO customer SET ?", customer, (err, res) => {
          if (err) throw err;
          console.log(res);
        });

        con.query("INSERT INTO contact SET ?", contact, (err, res) => {
          if (err) throw err;
          console.log(res);
        });

        resp.send("HELLO");
        console.log(result);
      }
    );
  });
};
