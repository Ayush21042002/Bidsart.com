const con = require("../database/db");

exports.updateAuction = (req,res) => {
    const auctionId = Number(req.body.auctionId);
    const startingPrice = Number(req.body.starting);
    const quantity =  Number(req.body.quantity);

    con.query("UPDATE auctions set startingPrice = ?, quantity = ? where auctionId = ?",[startingPrice,quantity,auctionId],
            (err,result) => {
                if(err) throw err;

                console.log(result);

                res.json({
                    message: "Successfully updated"
                });
    });
};