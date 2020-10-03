const con = require('../database/db');

exports.updateProduct= (req,res) => {
    const title = req.body.title;
    const description = req.body.description; 
    const category = req.body.category;
 
    con.query( "UPDATE products SET title= ? ,description = ? ,category = ?  where productId= ? " ,[title,description,category],  
        (err,result) => {
           if(err) throw err ; 
           res.json({msg:"Updated successfully......"}); 
    } )     
};
