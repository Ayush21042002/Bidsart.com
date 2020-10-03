const con = require("../database/db");

exports.addProduct = (req,resp) => {
  //construct a url to server
  const url = req.protocol + "://" + req.get('host');

  const product = [req.body.title,req.body.description,req.body.category]

  con.query("INSERT INTO products(title,description,category) VALUES (?)",[product], (err,result) => {
    if(err) throw err;

    const productId = result.insertId;

    const sellerId = Number(req.sellerData.sid);

    con.query("INSERT INTO has_products(sellerId,productId) VALUES (?)", [[sellerId,productId]],(err,res) => {
      if(err) throw err;

      console.log(res);
    });

    const count = req.files.length;

    let images = [];

    for(let i=0;i<count;i++){
      let imageURI = url + "/images/" + req.files[i].filename;
      let image = [productId,imageURI];
      images.push(image);
    }

    con.query("INSERT INTO image(productId,imageURI) VALUES ?", [images], (err,re) => {
      if(err) throw err;

      resp.json({ message: "ADDED PRODUCT"});
    });
  });

};