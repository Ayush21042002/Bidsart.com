const con = require('../database/db');

exports.getAllProducts = (req,res,next) => {
    
    con.query("select p.*,s.sid,s.name from product p inner join seller s on s.sid = p.sid order by p.pid; SELECT * from image order by pid;", (err, result) => {
      if (err) {
        throw err;
      }
    //   console.log(result);
      const resp = [];
      for(let i=0;i<result[0].length;i++){
        const product = {
          pid: result[0][i].pid,
          sid: result[0][i].sid,
          artist_name: result[0][i].name,
          title: result[0][i].title,
          description: result[0][i].description,
          category: result[0][i].category,
          images: result[1].filter( (item) => item.pid == result[0][i].pid),
        };
        resp.push(product);
      }
      // console.log(resp);
      res.json(resp);
    });
};

exports.getProductByProductId = (req,res) => {
    const query = "SELECT p.*,s.sid,s.name FROM product p inner join seller s on s.sid = p.sid where p.pid = ?; SELECT * FROM image where pid = ?;";
    // console.log(req.params.id);
    con.query(query, [req.params.id,req.params.id],(err,result) => {
        if(err) throw err;

        const product = {
            pid: result[0][0].pid,
            sid: result[0][0].sid,
            artist_name: result[0][0].name,
            title: result[0][0].title,
            description: result[0][0].description,
            category: result[0][0].category,
            images: result[1]
        }
        // console.log(resp);
        res.json(product);
    });
}; 

exports.getAllProductsBySeller = (req,res) => {
    const sellerId = req.params.sellerId;

  con.query("SELECT * FROM product where sid = ?; SELECT * FROM image where pid IN (SELECT pid from product where sid = ?);",
    [sellerId,sellerId], (err,result)=> {

      if(err) throw err;

      // console.log(result);

      const resp = [];
      for (let i = 0; i < result[0].length; i++) {
        const product = {
          pid: result[0][i].pid,
          title: result[0][i].title,
          description: result[0][i].description,
          category: result[0][i].category,
          images: result[1].filter(item => item.pid == result[0][i].pid)
        }
        resp.push(product);
      }
      // console.log(resp);
      res.json(resp);

    });
};

exports.getProductByAuctionId = (req,res) => {
  const aid = req.params.aid;

  if(aid){
    con.query("SELECT * FROM auction where aid = ?;",[aid],(err,result) => {
      if(err) throw err;
      
      if(result.length > 0){

        const pid = result[0].pid;

        con.query("select p.*,s.sid,s.name from product p inner join seller s on s.sid = p.sid where p.pid = ?; SELECT * from image where pid = ?;",[pid,pid], (err, result) => {
        if (err) {
          throw err;
        }
      //   console.log(result);
          const product = {
            pid: result[0][0].pid,
            sid: result[0][0].sid,
            artist_name: result[0][0].name,
            title: result[0][0].title,
            description: result[0][0].description,
            category: result[0][0].category,
            images: result[1]
          };
        // console.log(resp);
        res.json(product);
    });
      }else{
        res.status(404).json({
          message: "NO SUCH AUCTION"
        });
      }
    });
  }else{
    res.status(400).json({
      message: "AUCTION ID NOT PROVIDED"
    });
  }
};