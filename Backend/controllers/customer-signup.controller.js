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

    con.query("SELECT * FROM user where email = ?",[user.email], (err,searchResult) => {
      if(err) throw err;

      if(searchResult.length > 0){
        const userId = searchResult[0].userId;

        con.query("SELECT * FROM customer where customerId = ?",[userId], (err,customerResult) => {
          if(err) throw err;

          if(customerResult.length > 0){
            resp.json({
              message: "User already registered"
            })
          } else{
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

            const cust_address = {
              customerId: userId,
              houseNo: req.body.houseno,
              addressLine: req.body.addressLine,
              city: req.body.city,
              state: req.body.state,
              country: req.body.country,
              landmark: req.body.landmark,
            };

            con.query(
              "INSERT INTO customer SET ? ",
              customer,
              (err, customerResult) => {
                if (err) throw err;

                con.query(
                  "INSERT INTO contact SET ? ",
                  contact,
                  (err, contactResult) => {
                    if (err) throw err;

                    con.query(
                      "INSERT INTO cust_address SET ?",
                      cust_address,
                      (err, result) => {
                        if (err) throw err;
                        // console.log(res);
                        resp.send("Successfully added");
                      }
                    );
                  }
                );
              }
            );
          }
        });

      } else{
        con.query("INSERT INTO user SET ? ",user, (err,insertResult) => {
          if(err) throw err;

                  const userId = insertResult.userId;

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

                  const cust_address = {
                    customerId: userId,
                    houseNo: req.body.houseno,
                    addressLine: req.body.addressLine,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    landmark: req.body.landmark,
                  };

                  con.query(
                    "INSERT INTO customer SET ? ",
                    customer,
                    (err, customerResult) => {
                      if (err) throw err;

                      con.query(
                        "INSERT INTO contact SET ? ",
                        contact,
                        (err, contactResult) => {
                          if (err) throw err;

                          con.query(
                            "INSERT INTO cust_address SET ?",
                            cust_address,
                            (err, result) => {
                              if (err) throw err;
                              // console.log(res);
                              resp.send("Successfully added");
                            }
                          );
                        }
                      );
                    }
                  );

        });
      }
    })

});
};
