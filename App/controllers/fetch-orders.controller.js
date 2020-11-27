const con = require("../database/db");

exports.fetchOrdersByCustomerId = (req,res) => {
    const cid = req.customerData.cid;

    if(cid){

        let query = "select p.*,o.*,i.imageURI from Orders o inner join auction a on a.aid = o.aid inner join product p on p.pid = a.pid inner join (select pid,imageURI from image group by pid) as i on i.pid = p.pid where o.cid = ?;"

        con.query(query,[cid], (err,result) => {
            if(err) throw err;

            res.status(200).json({
                orders: result
            });
        });
    }else{
        res.status(401).json({
            message: "Authentication Failed!!"
        });
    }
};