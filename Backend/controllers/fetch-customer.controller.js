const con = require("../database/db");

exports.getAllCustomers = (req,res) => {
    con.query("SELECT * FROM customer",(err,result) => {
        if(err) throw err;
        
        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.status(200).send("No Customers");
        }
    });
};

exports.getCustomerById = (req,res) => {
    const customerId = req.customerData.cid;
    // console.log(customerId);
    con.query(
      "select c.*,o.contact,o.countrycode,a.houseNo,a.addressLine,a.city,a.state,a.country,a.landmark from customer c,contact o,cust_address a where c.customerId = ?",
      [customerId], (err,result) => {
          if(err) throw err;

          if(result.length > 0){
              res.status(200).json(result[0]);
          }else{
              res.status(300).send("No Such Customer");
          }
      }
    );
};