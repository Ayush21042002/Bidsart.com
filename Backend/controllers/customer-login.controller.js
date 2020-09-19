const _Bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { threadId } = require("../database/db");
const con = require("../database/db");

exports.customerLogin = (req, resp, next) => {
  let authorizedCustomer;
  con.query("SELECT * FROM user where email = ?",[req.body.email], (err,result) => {
    let passwordCorrect = false;
    if(err) throw err;
    
    // console.log(result);

    if(result){
        _Bcrypt.compare(req.body.password, result[0].password, (err,ans) => {
            passwordCorrect = ans;
            if(!passwordCorrect){
                resp.status(401).send("Wrong Password");
            }
            else{
                con.query(
                "SELECT * FROM customer where customerId = ?",
                [result[0].userId],
                (err, res) => {
                    if (err) throw err;

                    // console.log(res);

                    if (res.length > 0) {
                    const token = jwt.sign(
                        { email: result[0].email, customerId: result[0].userId },
                        "Thisistheverificatonsecretkeyforcustomers",
                        { expiresIn: "1h" }
                    );
                    resp.status(200).json({
                        token: token,
                        expirationTime: 3600,
                        customerId: result[0].userId,
                        email: result[0].email,
                        CustomerName: {
                        fname: res[0].fname,
                        mname: res[0].mname,
                        lname: res[0].lname,
                        },
                    });
                    } else {
                    resp.status(401).send("No customer from these credentials");
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
