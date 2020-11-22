const con = require('../database/db');

exports.getAllProducts = (req,res,next) => {
    
    con.query("select p.*,s.sid,s.name from product p inner join has_pd h on h.pid = p.pid inner join seller s on s.sid = h.sid order by p.pid; SELECT * from image order by pid;", (err, result) => {
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
    const query = "SELECT p.*,s.sid,s.name FROM product p inner join has_pd h on h.pid = p.pid inner join seller s on s.sid = h.sid where p.pid = ?; SELECT * FROM image where pid = ?;";
    // console.log(req.params.id);
    con.query(query, [req.params.id,req.params.id],(err,result) => {
        if(err) throw err;

        const resp = [];
        for(let i=0;i<result[0].length;i++){
            const product = {
                pid: result[0][i].pid,
                sid: result[0][i].sid,
                artist_name: result[0][i].name,
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

exports.getAllProductsBySeller = (req,res) => {
    const sellerId = req.params.sellerId;

  con.query("SELECT * FROM product where pid IN (SELECT pid from has_pd where sid = ?); SELECT * FROM image where pid IN (SELECT pid from has_pd where sid = ?);",
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

