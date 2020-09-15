const con = require('../database/db');

exports.getAllProducts = (req,res,next) => {
    
    con.query("SELECT * FROM products order by productId; SELECT * from image order by productId;", (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.json({products: result[0], images: result[1]});
    });
};

exports.getProductByid = (req,res) => {
    const query = "SELECT * FROM products where productId = ?; SELECT * FROM image where productId = ?";
    console.log(req.params.id);
    con.query(query, [req.params.id,req.params.id],(err,result) => {
        if(err) throw err;

        console.log(result);
        res.json({product: result[0], images: result[1]});
    }) 
};