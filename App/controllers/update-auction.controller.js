const con = require("../database/db");

exports.updateAuction = (req,res) => {
    const aid = Number(req.params.id);
    const minBid = req.body.minBid;
    const startTime = req.body.startTime;

    con.query("UPDATE auction set minBid = ?, startTime = ? where aid = ?",[minBid,startTime,aid],
            (err,result) => {
                if(err) throw err;

                console.log(result);

                res.status(201).json({
                    message: "Successfully updated"
                });
    });
};