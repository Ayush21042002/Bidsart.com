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
                resp.status(401).send("Wrong Password");
            }
            else{ 
                con.query(
                "SELECT * FROM seller where sid = ?",
                [result[0].userId],
                (err, res) => {
                    if (err) throw err;

                    // console.log(res);

                    if (res.length > 0) {
                    const token = jwt.sign(
                        { email: result[0].email, sid: result[0].userId },
                        "Thisistheverificatonsecretkeyforcustomers",
                        { expiresIn: "1h" }
                    );
                    resp.status(200).json({
                        token: token,
                        expirationTime: 3600,
                        sid: result[0].userId,
                        email: result[0].email,
                        companyName: res[0].company_name,
                    });
                    } else {
                    resp.status(401).send("No seller from these credentials");
                    }
                }
                );
            }
        });
        
    }else{
        resp.status(401).send("No email exists");
    }
    });
}
