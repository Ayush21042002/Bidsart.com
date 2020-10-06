const con = require("../database/db") ;

exports.getAllSellers = (err,res)=>{
  con.query("SELECT * from seller",(err,result)=>{
      if(err) throw err;
      if(result.length>0){
          res.status(200).json(result);
      }else{  
       res.status(200).send("NO Sellers");
      }
  } );
};

exports.getSellerById = (req,res) => {
  const sid = req.sellerData.sid;
  
  con.query(
    "select sid, building_no,add1,add2, state , country,zip ,landmark ,pan_num ,aadhar_num from seller where sid = ?",
    [sid], (err,result) => {
        if(err) throw err;

        if(result.length > 0){
            res.status(200).json(result[0]);
        }else{
            res.status(300).send("No Such Seller");
        }
    }
  );
};