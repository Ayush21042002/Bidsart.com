const con = require("../database/db");

exports.addProduct = (req,resp) => {
  //construct a url to server
  const url = "https://bidsart.herokuapp.com/";

  if(!req.body.title || req.body.title == ""){
    resp.status(400).json({
      message: "Provided Title is not appropriate"
    });
  }

  if(!req.body.description || req.body.description == ""){
    resp.status(400).json({
      message: "Provided Description is not appropriate"
    });
  }

  if(!req.body.category || req.body.category == ""){
    resp.status(400).json({
      message: "Provided Category is not provided"
    });
  }

  if(req.files.length == 0){
    resp.status(400).json({
      message: "A single image should be provided"
    })
  }

  let category = req.body.category.toLowerCase();

  con.query("INSERT INTO product(title,description,category,sid) VALUES (?)",
  [[req.body.title,req.body.description,category,req.sellerData.sid]], (err,result) => {
    if(err) throw err;

    const productId = result.insertId;

    const count = req.files.length;

    let images = [];

    for(let i=0;i<count;i++){
      let imageURI = url + "/images/" + req.files[i].filename;
      let image = [productId,imageURI];
      images.push(image);
    }

    con.query("INSERT INTO image(pid,imageURI) VALUES ?", [images], (err,re) => {
      if(err){
        con.query("DELETE FROM product where pid = ?",[productId],(err,res) => {});
        throw err;
              }

      resp.status(201).json({
        message: "Product successfully added"
      });
    });
  });

};