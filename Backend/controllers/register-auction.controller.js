const con = require("../database/db");

exports.registerAuction = (req,res) => {
    const auction = {
        productId : Number(req.body.productId),
        startingPrice: Number(req.body.starting),
        auctionday: req.body.day,
        auctiontime: req.body.time,
        status: "Scheduled",
        quantity: Number(req.body.quantity)
    };

    con.query("INSERT INTO auctions SET ?",auction, (err,result) => {
        if(err) throw err;

        console.log(result);

        res.status(200).json({
            message: "Successfully scheduled an auction for the product",
            auctionDetails: auction
        })
    });

};