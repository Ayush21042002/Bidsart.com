//Starting to code for seller sign-up
const _Bcrypt = require("bcryptjs");

const con = require('../database/db');

exports.createSeller = (req, resp) => {
    //   console.log(req.body);
  _Bcrypt.hash(req.body.password, 10).then((hash) => {
    //console.log(req.body);
    const user = {
        email: req.body.email,
        password:  hash
    }
    // console.log(user);

        con.query("SELECT * FROM user WHERE email = ?",[user.email], (err,userResult) => {
            if(err) throw err;

            if(userResult.length > 0){
                const userId = userResult[0].userId;

                con.query("SELECT * FROM seller where sid = ?",[userId], (err,sellerSearch) => {
                    if(err) throw err;

                    if(sellerSearch.length > 0){
                        resp.json({
                            message: "Seller already registered"
                        });
                    }else{
                        const seller = {
                          sid: userId,
                          company_name: req.body.company_name,
                          building_no: Number(req.body.building_no),
                          add1: req.body.add1,
                          add2: req.body.add2,
                          state: req.body.state,
                          country: req.body.country,
                          zip: Number(req.body.zip),
                          landmark: req.body.landmark,
                          pan_num: req.body.pan_num,
                          aadhar_num: req.body.aadhar_num,
                          contact1: req.body.contact1,
                          contact2: req.body.contact2
                        };
                        // console.log(seller);
                        con.query("INSERT INTO seller SET ?",seller,(err, res) => {
                            if (err) throw err;

                            resp.send("Successfully added");
                        });
                    }
                });
            }else{
                con.query("INSERT INTO user SET ? ",user,(err,insertResult) => {
                    if(err) throw err;

                    const userId= result.insertId; //use of auto_increment in sid
                    const seller = {
                      sid: userId,
                      company_name: req.body.company_name,
                      building_no: Number(req.body.building_no),
                      add1: req.body.add1,
                      add2: req.body.add2,
                      state: req.body.state,
                      country: req.body.country,
                      zip: Number(req.body.zip),
                      landmark: req.body.landmark,
                      pan_num: req.body.pan_num,
                      aadhar_num: req.body.aadhar_num,
                      contact1: req.body.contact1,
                      contact2: req.body.contact2,
                    };
                    // console.log(seller);
                    con.query("INSERT INTO seller SET ?",
                    seller,(err,res)=>{
                        if(err) throw err;

                        resp.send("Successfully added");
                    }
                    )
                });
            }
        });
    }
)};
