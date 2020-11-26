const con = require("../database/db");

exports.registerAuction = (req,res) => {
    const auction = {
        pid : Number(req.body.pid),
        minBid: Number(req.body.minBid),
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        status: "scheduled"
    };

    con.query("INSERT INTO auction SET ?",auction, (err,result) => {
        if(err) throw err;

        res.status(201).json({
            message: "Successfully scheduled an auction for the product",
            auctionDetails: auction
        })
    });

};