const con = require("../database/db");

exports.deleteAuctionByAuctionId = (req,res) => {
    const auctionId = Number(req.params.auctionId);
    const sid = req.sellerData.sid;

    con.query("SELECT p.sid from product p inner join auction a on a.pid = p.pid and a.aid = ?",[auctionId],(err,searchResult) => {
        if(err) throw err;

        if(searchResult[0].sid == sid){
            con.query("DELETE FROM auction WHERE aid = ? and status = 'scheduled' ",[auctionId],(err,result) => {
                if(err) throw err;

                console.log(result);

                res.status(200).json({
                    message: "Successfully deleted"
                });
            });
        }else{
            res.json({
                message: "You cannot cancel other seller auction"
            });
        }
    });
};

exports.deleteAuctionsByProductId = (req,res) => {
    const productId = Number(req.params.productId);

    con.query("DELETE FROM auction WHERE pid = ? and status = 'scheduled' ",[productId], (err,result) => {
        if(err) throw err;

        console.log(result);

        res.json({
            message: "Successfully Deleted Auctions",
            productId: productId,
            number: result[0].affectedRows,
        })
    });
};