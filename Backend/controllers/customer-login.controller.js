const _Bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const con = require("../database/db");

exports.customerLogin = (req, resp, next) => {
  let authorizedCustomer;
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
                let userId = result[0].uid; 
                con.query(
                "SELECT * FROM customer where cid = ?",
                [userId],
                (err, res) => {
                    if (err) throw err;

                    // console.log(res);

                    if (res.length > 0) {
                    const token = jwt.sign(
                        { email: result[0].email, cid: userId },
                        "Thisistheverificatonsecretkeyforcustomers",
                        { expiresIn: "1h" }
                    );
                    resp.status(200).json({
                        token: token,
                        expirationTime: 3600,
                        cid: userId,
                        email: result[0].email,
                        CustomerName: {
                        fname: res[0].fname,
                        lname: res[0].lname,
                        message: "Successfully Logged in"
                        }
                    });
                    } else {
                        resp.status(404).json({
                            message: "No customer from these credentials"
                        });
                    }
                }
                );
            }
        });
        
    }else{
        resp.status(404).json({
            message: "No such email registered"
        });
    }
    });
}
