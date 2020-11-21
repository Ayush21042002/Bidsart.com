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

            const checkField = {             // This js object contains all the fields which have the constraint not null
              fname: req.body.fname,
              contact: req.body.contact,
              coCode: req.body.countrycode,
              addLine: req.body.addressLine,
              city: req.body.city,
              state: req.body.state,
              country: req.body.country,
              zip: req.body.zip
              
          };    
      
           var check = true; 
           for (var key in checkField) {
                  if (checkField[key] == null || checkField[key] == "")
                      check = false; 
           }
           if(!check){
             resp.status(400).json({message:"Details  provided are not sufficient"});
           }
            else{
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
          const checkField = {             // This js object contains all the fields which have the constraint not null
            fname: req.body.fname,
            contact: req.body.contact,
            coCode: req.body.countrycode,
            addLine: req.body.addressLine,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zip: req.body.zip
            
        };    
    
         var check = true; 
         for (var key in checkField) {
                if (checkField[key] == null || checkField[key] == "")
                    check = false; 
         }
         if(!check){
           resp.status(400)({message:"Details  provided are not sufficient"});
         }
         else{
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
