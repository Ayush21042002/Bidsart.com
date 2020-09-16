const con = require('../database/db');

exports.getAllProducts = (req,res,next) => {
    
    con.query("SELECT * FROM products order by productId; SELECT * from image order by productId;", (err, result) => {
      if (err) {
        throw err;
      }
    //   console.log(result);
      const resp = [];
      for(let i=0;i<result[0].length;i++){
        const product = {
          productId: result[0][i].productId,
          title: result[0][i].title,
          description: result[0][i].description,
          category: result[0][i].category,
          images: result[1].filter( (item) => item.productId == result[0][i].productId),
        };
        resp.push(product);
      }
      // console.log(resp);
      res.json(resp);
    });
};

exports.getProductByid = (req,res) => {
    const query = "SELECT * FROM products where productId = ?; SELECT * FROM image where productId = ?";
    // console.log(req.params.id);
    con.query(query, [req.params.id,req.params.id],(err,result) => {
        if(err) throw err;

        const resp = [];
        for(let i=0;i<result[0].length;i++){
            const product = {
                productId: result[0][i].productId,
                title: result[0][i].title,
                description: result[0][i].description,
                category: result[0][i].category,
                images: result[1].filter(item => item.productId == result[0][i].productId)
            }
            resp.push(product);
        }
      // console.log(resp);
      res.json(resp);
    });
}; 