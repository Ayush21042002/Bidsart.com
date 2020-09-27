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
    con.query(
        "INSERT INTO user SET ?",user,
        (err,result)=> {    //result status after running sql query.e.g(1 row effected and all)
            if(err) throw err;
            const userId= result.insertId; //use of auto_increment in sid
            const seller= {
               sid:userId,
               company_name:req.body.company_name,
               building_no:req.body.building_no,
               add1:req.body.add1,
               add2:req.body.add2,
               state:req.body.city,
               country:req.body.country,
               zip:req.body.zip,
               landmark:req.body.landmark,
               pan_num:req.body.pan_num,
               aadhar_num:req.body.aadhar_num
            };
            con.query("INSERT INTO seller SET ?",
            seller,(err,res)=>{
                if(err) throw err;
              resp.send("Successfully added");
            }
             )
        }
    )
  }
  )};
