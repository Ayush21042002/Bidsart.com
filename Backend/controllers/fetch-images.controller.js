const con = require("../database/db");

exports.getImages = (req,res) => {
    con.query("SELECT * FROM image", (err,result) => {
        if(err) throw err;

        res.json({
            images: result
        });
    });
};