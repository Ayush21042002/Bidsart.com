const con = require("../database/db");

exports.getAllAuctions = (req,res) => {

    con.query("SELECT * FROM auctions",(err,result) => {
        if(err) throw err;

        console.log(result);

        res.json({
            message: "All auctions",
            auctions: result
        });
    });
};

exports.getAuctionByProductId = (req,res) => {
    const productId = Number(req.params.productId);

    con.query("SELECT * FROM auctions where productId = ?",[productId], (err,result) => {
        if(err) throw err;

        console.log(result);

        res.json({
            message: `All Auctions having productId = ${productId}`,
            auctions: result
        });
    });
};