const con = require("../database/db");

exports.bookAuction = (req,res) => {
    
    if(!req.body.aid){
        res.status(400).json({
            message: "No auction provided to be registered"
        });
    }
    
    const customerBook = {
        cid: Number(req.customerData.cid),
        aid: Number(req.body.aid),
    };
    con.query("SELECT * FROM auct_reg WHERE cid = ? AND aid = ?;",[customerBook.cid,customerBook.aid],(err,searchResult) => {
        if(err) throw err;

        if(searchResult.length > 0){
            res.status(200).json({
                message: "Already Registered"
            });
        }else{
            con.query("INSERT INTO auct_reg SET ?",customerBook, (err,result) => {
            if(err) throw err;

            res.status(201).json({
                message: "Successfully Booked",
            });
        });
        }
    });
};