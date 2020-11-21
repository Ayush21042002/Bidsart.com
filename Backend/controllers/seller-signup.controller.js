//Starting to code for seller sign-up
const _Bcrypt = require("bcryptjs");

const con = require('../database/db');

exports.createSeller = (req, resp) => {
    //    console.log(req.body);
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
    //console.log(req.body);
    const user = {
        email: req.body.email,
        password:  hash
    }
    // console.log(user);

    con.query("SELECT * FROM user WHERE email = ?",[user.email], (err,userResult) => {
        if(err) throw err;

        if(userResult.length > 0){
            console.log(userResult);
            const userId = userResult[0].uid;

            con.query("SELECT * FROM seller where sid = ?",[userId], (err,sellerSearch) => {
                if(err) throw err;

                if(sellerSearch.length > 0){
                    resp.json({
                        message: "Seller already registered"
                    });
                }else 
                 {
                    const checkfield = {
                        name: req.body.artist_name,
                        addrLine: req.body.addressLine,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        contact1: req.body.contact1,
                        panNo: req.body.pan_num
                    } 
                
                    var check = true; 
                    for(var key in checkfield){
                        if(checkfield[key] == "" || checkfield[key]==null)
                            check = false;
                    }
                    if(!check){
                        res.status(400).json({
                            message:"Wrong details "})
                    }
                else{
                    const seller = {
                        sid: userId,
                        name: req.body.artist_name,
                        addrLine: req.body.addressLine,
                        city: req.body.city,
                        state: req.body.state,
                        zip: Number(req.body.zip),
                        landmark: req.body.landmark,
                        panNo: req.body.pan_num,
                        contact1: req.body.contact1,
                        contact2: req.body.contact2,
                        accNo: req.body.account_no,
                        bankName: req.body.bank_name
                    };
                    // console.log(seller);
                    con.query("INSERT INTO seller SET ?",seller,(err, res) => {
                        if (err) throw err;

                        resp.status(201).json({
                            message: "successfully registered and password is same as for customer id with this email"
                        });
                    });
                }
            }
            });
        }else{
            con.query("INSERT INTO user SET ? ",user,(err,insertResult) => {
                if(err) throw err;

                const userId= insertResult.insertId; //use of auto_increment in sid
                
                const checkfield = {
                    name: req.body.artist_name,
                    addrLine: req.body.addressLine,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    contact1: req.body.contact1,
                    panNo: req.body.pan_num
                } 
            
                var check = true; 
                for(var key in checkfield){
                    if(checkfield[key] == "" || checkfield[key]==null)
                        check = false;
                }
                if(!check){
                    res.status(400).json({
                        message:"Wrong details "})
                }
                else{
                    const seller = {
                        sid: userId,
                        name: req.body.artist_name,
                        addrLine: req.body.addressLine,
                        city: req.body.city,
                        state: req.body.state,
                        zip: Number(req.body.zip),
                        landmark: req.body.landmark,
                        panNo: req.body.pan_num,
                        contact1: req.body.contact1,
                        contact2: req.body.contact2,
                        accNo: req.body.account_no,
                        bankName: req.body.bank_name
                    };
                    // console.log(seller);
                    con.query("INSERT INTO seller SET ?",seller,(err, res) => {
                        if (err) throw err;

                        resp.status(201).json({
                            message: "successfully Registered"
                        });
                    });
                }
            });
        }
        });
    });
    }
};
