const con = require("../database/db") ;

exports.updateSeller = ( req , res) => {
    const sid = req.sellerData.sid ;
    
    const checkfield = {
        name: req.body.artist_name,
        addrLine: req.body.addressLine,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        contact1: req.body.contact1
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
        con.query("update seller set name =? ,addrLine=? ,city=?,state = ? , zip = ? , landmark = ? , bankName = ? , accNo =?, contact1=? , contact2=?",
        [checkfield.name , checkfield.addrLine,checkfield.city , checkfield.state , checkfield.zip,req.body.landmark ,req.body.bankName, req.body.accNo,checkfield.contact1,req.body.contact2]
        ,(err , result) => {
           if(err) throw err ; 
            
         console.log(result);  
         res.status(200).json({message:"Details are updated successfully"}) ;
        })
    }
}