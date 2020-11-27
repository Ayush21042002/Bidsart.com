const con = require("../database/db");

exports.placeOrder = (req,res) => {

    console.log(req.body);

    const cid = req.customerData.cid;
    const aid = req.body.aid;
    
    if(aid && cid){

        let query1 = "SELECT * FROM auct_log WHERE aid = ? AND cid = ?;";

        let query2 = "UPDATE auction set status = 'ended', endTime = ? WHERE aid = ?";
        
        let query3 = "INSERT INTO Orders(aid,cid,amount) VALUES(?)";

        con.query(query1 + query2,[aid,cid,new Date(),aid],(err,result) => {
            if(err) throw err;

            if(result[0].length > 0){
                // console.log("************",result,"***********");

                con.query(query3,[[aid,cid,result[0][0].currBid]],(err,insertRes) => {
                    if(err) throw err;

                    console.log("PLACED");

                    res.status(201).json({
                        message: "Successfully placed an order please pay for completion"
                    });
                });
            }else{
                res.send(300).json({
                    message: "SERVER ERROR"
                });
            }
        });
    }else{
        res.status(400).json({
            message: "INFORMATION NOT PROVIDED"
        });
    }
};