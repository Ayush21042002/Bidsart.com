const _Bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const con = require("../database/db");

exports.sellerLogin = (req, resp, next) => {
  let authorizedSeller;
  con.query("SELECT * FROM user where email = ?",[req.body.email], (err,result) => {
    let passwordCorrect = false;
    if(err) throw err;
    
    // console.log(result);

    if(result.length > 0){
        _Bcrypt.compare(req.body.password, result[0].password, (err,ans) => {
            passwordCorrect = ans;
            if(!passwordCorrect){
                resp.status(401).json({
                    message: "Wrong Password"
                });
            }
            else{ 
                con.query(
                "SELECT * FROM seller where sid = ?",
                [result[0].uid],
                (err, res) => {
                    if (err) throw err;
                    // console.log(res);

                    if (res.length > 0) {
                    const token = jwt.sign(
                        { email: result[0].email, sid: result[0].uid },
                        "Thisistheverificatonsecretkeyforsellers",
                        { expiresIn: "10h" }
                    );
                    resp.status(200).json({
                        token: token,
                        expirationTime: 3600,
                        sid: result[0].uid,
                        email: result[0].email,
                        artist_name: res[0].name,
                        message: "Successfully Logged in"
                    });
                    } else {
                        resp.status(404).json({
                            message: "No seller from these credentials"
                        });
                    }
                }
                );
            }
        });
        
    }else{
        resp.status(404).json({
            message: "No email exists"
        });
    }
    });
}
