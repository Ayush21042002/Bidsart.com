const con = require("../database/db");

exports.deleteAuctionByAuctionId = (req,res) => {
    const auctionId = Number(req.params.auctionId);

    con.query("DELETE FROM auctions WHERE auctionId = ? and status = 'Scheduled' ",[auctionId],(err,result) => {
        if(err) throw err;

        console.log(result);

        res.status(200).json({
            message: "Successfully deleted"
        });
    });
};

exports.deleteAuctionsByProductId = (req,res) => {
    const productId = Number(req.params.productId);

    con.query("DELETE FROM auctions WHERE productId = ? and status = 'Scheduled' ",[productId], (err,result) => {
        if(err) throw err;

        console.log(result);

        res.json({
            message: "Successfully Deleted Auctions",
            productId: productId,
            number: result[0].affectedRows,
        })
    });
};