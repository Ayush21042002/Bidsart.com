const con = require("../database/db");

exports.getAllAuctions = (req,res) => {

    con.query("select a.*,I.imageURI from auction a inner join (select pid,imageURI from image group by pid) as I on a.pid = I.pid;;",(err,result) => {
        if(err) throw err;

        res.json({
            message: "All auctions",
            auctions: result
        });
    });
};

exports.getAuctionByProductId = (req,res) => {
    const productId = Number(req.params.productId);

    con.query("SELECT * FROM auction where pid = ?",[productId], (err,result) => {
        if(err) throw err;

        res.json({
            message: `All Auctions having productId = ${productId}`,
            auctions: result
        });
    });
};