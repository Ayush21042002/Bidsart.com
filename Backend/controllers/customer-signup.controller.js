const _Bcrypt = require("bcryptjs");

const con = require('../database/db');

exports.createCustomer = (req, resp) => {
    //   console.log(req.body);
  _Bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = {
        email: req.body.email,
        password:  hash
    }
    const fname = req.body.fname;
    const mname = req.body.mname;
    const lname = req.body.lname;
    con.query(
      "INSERT INTO user SET ?",user,
      (err, result) => {
        if (err) throw err;
        const userId = result.insertId;
        const customer = {
            customerId: userId,
            fname: fname,
            mname: mname,
            lname: lname,
        };
        con.query("INSERT INTO customer SET ?",customer,(err,res) => {
            if(err) throw err;
            resp.send("SUCCESSFULL");
            console.log(res);
        });
        console.log(result);
      }
    );
  });
};
