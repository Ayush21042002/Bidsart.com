const _Bcrypt = require("bcryptjs");

const con = require('../database/db');

exports.createCustomer = (req, resp) => {

  // console.log(req.body);

  if(!req.body.email || req.body.email == ""){
      resp.status(400).json({
        message: "Provided email is not appropriate"
      });
  }
  else if(!req.body.password ||  req.body.password == ""){
      resp.status(400).json({
        message: "Provided password is not appropriate"
      });
  }else{
    _Bcrypt.hash(req.body.password, 10).then((hash) => {

    const user = {
        email: req.body.email,
        password:  hash
    };

    con.query("SELECT * FROM user where email = ?",[user.email], (err,searchResult) => {
      if(err) throw err;

      if(searchResult.length > 0){
        const userId = searchResult[0].uid;

        con.query("SELECT * FROM customer where cid = ?",[userId], (err,customerResult) => {
          if(err) throw err;

          if(customerResult.length > 0){
            resp.status(200).json({
              message: "Customer already registered"
            });
          }else{

            if(!req.body.fname || req.body.fname == ""){
              resp.status(400).json({
                message: "Provided first name is not appropriate"
              });
            }
            else if(!req.body.contact || req.body.contact == ""){
              resp.status(400).json({
                message: "Provided contact is not appropriate"
              });
            }
            else if(!req.body.countrycode || req.body.countrycode == ""){
              resp.status(400).json({
                message: "Provided country code is not appropriate"
              });
            }
            else if(!req.body.addressLine || req.body.addressLine == ""){
              resp.status(400).json({
                message: "Provided Address Line is not appropriate"
              });
            }
            else if(!req.body.city || req.body.city == ""){
              resp.status(400).json({
                message: "Provided city is not appropriate"
              });
            }
            else if(!req.body.state || req.body.state == ""){
              resp.status(400).json({
                message: "Provided state is not appropriate"
              });
            }
            else if(!req.body.country || req.body.country == ""){
              resp.status(400).json({
                message: "Provided country is not appropriate"
              });
            }
            else if(!req.body.zip || req.body.zip == ""){
              resp.status(400).json({
                message: "Provided Zip code is not appropriate"
              });
            }else{
              const customer = {
              cid: userId,
              fname: req.body.fname,
              lname: req.body.lname,
              contact: req.body.contact,
              coCode: req.body.countrycode,
              addLine: req.body.addressLine,
              city: req.body.city,
              state: req.body.state,
              country: req.body.country,
              landmark: req.body.landmark,
              zip: req.body.zip
              };

              con.query(
                "INSERT INTO customer SET ? ",
                customer,
                (err, insertedCustomerResult) => {
                  if (err) throw err;

                  resp.status(201).json({
                    message: "Customer successfully registered and password is same as seller id with this email"
                  });
                }
              );
            }
          }
        });
      } else{
        con.query("INSERT INTO user SET ? ",user, (err,insertResult) => {
          if(err) throw err;

          const userId = insertResult.insertId;

            if(!req.body.fname || req.body.fname == ""){
              resp.status(400).json({
                message: "Provided first name is not appropriate"
              });
            }
            else if(!req.body.contact || req.body.contact == ""){
              resp.status(400).json({
                message: "Provided contact is not appropriate"
              });
            }
            else if(!req.body.countrycode || req.body.countrycode == ""){
              resp.status(400).json({
                message: "Provided country code is not appropriate"
              });
            }
            else if(!req.body.addressLine || req.body.addressLine == ""){
              resp.status(400).json({
                message: "Provided Address Line is not appropriate"
              });
            }
            else if(!req.body.city || req.body.city == ""){
              resp.status(400).json({
                message: "Provided city is not appropriate"
              });
            }
            else if(!req.body.state || req.body.state == ""){
              resp.status(400).json({
                message: "Provided state is not appropriate"
              });
            }
            else if(!req.body.country || req.body.country == ""){
              resp.status(400).json({
                message: "Provided country is not appropriate"
              });
            }
            else if(!req.body.zip || req.body.zip == ""){
              resp.status(400).json({
                message: "Provided Zip code is not appropriate"
              });
            }else{
              const customer = {
              cid: userId,
              fname: req.body.fname,
              lname: req.body.lname,
              contact: req.body.contact,
              coCode: req.body.countrycode,
              addLine: req.body.addressLine,
              city: req.body.city,
              state: req.body.state,
              country: req.body.country,
              landmark: req.body.landmark,
              zip: req.body.zip
            };

            con.query(
              "INSERT INTO customer SET ? ",
              customer,
              (err, insertedCustomerResult) => {
                if (err) throw err;

                resp.status(201).json({
                  message: "Customer successfully registered"
                });
              });
            }    
        });
      }
    })
  });
  }
};
