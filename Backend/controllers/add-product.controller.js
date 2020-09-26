const con = require("../database/db");

exports.addProduct = (req,resp) => {
  //construct a url to server.
  const url = req.protocol + "://" + req.get("host");
  
  const product = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
  };

  con.query("INSERT INTO products SET ?",product, (err,result) => {
    if(err) throw err;

    // console.log(result);
    resp.send("Successfull");
  });

};