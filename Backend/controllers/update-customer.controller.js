const con = require("../database/db");

exports.updateCustomer = (req , res)  => {
    const cid = req.customerData.cid ; 
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
     
    
    if(!check ){
      res.status(400).json({message:"Provided details are wrong"});
    }
    else{
        con.query('UPDATE customer set fname =?,lname=?,addline=?,city=?,state=?,country=?,zip=?,landmark=?,coCode=?,contact=? where cid= ?' , 
        [checkField.fname,req.body.lname,checkField.addLine,checkField.city,checkField.state,checkField.country,checkField.zip,req.body.landmark,checkField.coCode,checkField.contact,cid] ,
        
        (err,result) =>
        {
            if(err) throw err;
               
           console.log(result);
           res.status(200).json({message:"Details updated successfully"});
        
        })
    }
}