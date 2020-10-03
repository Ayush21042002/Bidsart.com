const con = require("../database/db");

exports.deleteProductbyId = (req,res) => {
    const productId = req.params.id;

    con.query("SELECT sellerId from has_products where productId = ?",[productId], (err,result1) => {
        
        if(err) throw err;

        if(result1[0].sellerId == req.sellerData.sid){
            con.query("DELETE FROM has_products where productId = ?", [productId], (err, result) => {
                if (err) throw err;


                // Checking if the product has any orders related to it
                // remeber to create a trigger which will work if the product deleted in this relation does not 
                // has any orders related to it else leave the product in the products table as archive products

                res.json({ message: "Product Successfully deleted" });

            });
        }else{
            res.json({ message: "Not Authorized"});
        }
    });
};