const con = require("../database/db");

exports.registerAuction = (req,res) => {
    const auction = {
        pid : Number(req.body.pid),
        minBid: Number(req.body.startingPrice),
        startTime: req.body.start,
        endTime: req.body.end,
        status: "scheduled"
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