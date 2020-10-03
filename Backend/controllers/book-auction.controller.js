const con = require("../database/db");

exports.bookAuction = (req,res) => {
    const customerBook = {
        customerId: Number(req.customerData.customerId),
        auctionId: Number(req.body.auctionId),
    };

    con.query("INSERT INTO auct_regs SET ?",customerBook, (err,result) => {
        if(err) throw err;

        console.log(result);

        res.json({
            message: "Successfully Booked",
        });
    });
};