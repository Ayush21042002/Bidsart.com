const con = require('../database/db');

exports.updateProduct= (req,res) => {

    // console.log(req.body);

    const title = req.body.title;
    const description = req.body.description; 
    const category = req.body.category;
    const pid = req.params.id;
 
    con.query( "UPDATE product SET title= ? ,description = ? ,category = ? where pid= ? " ,[title,description,category,pid],  
        (err,result) => {
           if(err) throw err ; 
           res.status(201).json({
               message:"Updated successfully......"
            }); 
    } )     
};
