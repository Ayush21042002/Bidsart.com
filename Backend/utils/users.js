const con = require("../database/db");

//Join User to chat

function userJoin(id,cid,username, aid) {
    const user = {
         id,
         cid, 
         aid,
         currBid: 0,
         isWinner: 0,
         joinTime: new Date(),
         username 
        };

    // console.log(user);

    return new Promise((resolve,reject) => {
            con.query("SELECT * FROM auct_log WHERE aid = ? AND cid = ?", [aid,cid], (err,result) => {
                if(err) reject(err);

                con.query("INSERT INTO auct_log SET ?;",user, (err,result) => {
                    if(err) reject(err);

                    resolve(user);
                });
            });
    });
}

// Get Current User

function getCurrentUser(id) {
    return new Promise((resolve,reject) => {
        con.query("SELECT * FROM auct_log WHERE id = ?", [id], (err,result) => {
            if(err || result.length == 0){
                // throw(err);
                reject(err);
            }

            // console.log("QUERY",result[0]);
            
            resolve(result[0]);
        });
    })
}

// User Leaves 

function userLeave(id) {
    return new Promise((resolve,reject) => {
        con.query("DELETE FROM auct_log where id = ?",[id], (err,resdel) => {
            if(err){
                reject(err);
                throw(err);
            }

            resolve("DELETED");
        });
    });
}

// Get Room Users

function getRoomUsers(aid) {
    return new Promise((resolve,reject) => {
        con.query("SELECT * FROM auct_log WHERE aid = ?;",[aid], (err,result) => {
            if(err) reject(err);

            resolve(result);
        });
    });
}

function updateBid(id, Bid,aid) {

    // console.log(id," " + Bid," UPDATE");

    return new Promise((resolve,reject) => {
        if(isNaN(Bid)){
            resolve("NOT A DECIMAL NUMBER");   
        }else{
            con.query("UPDATE auct_log set currBid = ? where id = ?",[Bid,id], (err,result) => {
                if(err) reject(err);

                con.query("select * from auct_log where currBid = (select max(currBid) as currBid from auct_log where aid = ?);",[aid],(err,maxBid) => {
                    if(err){
                        reject(err);
                        throw err;
                    }

                    console.log(maxBid," curr max bid");

                    con.query("UPDATE auct_log set isWinner = 1 where id = ?",
                    [maxBid[0].id], 
                    (err,updateResult) => {
                        if(err) reject(err);

                        resolve("UPDATED");
                    });
                });
            });
        }
    });
}

function getWinningUser(aid) {

    // console.log(room);

    return new Promise((resolve,reject) => {
        con.query("SELECT * FROM auct_log WHERE isWinner = 1 AND aid = ?;",[aid], (err,result) => {
            if(err) reject(err);
            
            if(result.length == 0){
                con.query("SELECT * FROM auction where aid = ?",[aid], (err,auctionResult) =>{
                    if(err) throw err;

                    // console.log(auctionResult);

                    resolve({
                        username: "AUCTION HEAD",
                        currBid: auctionResult[0].minBid
                    });
                }) 
            }else
                resolve(result[0]);
        });
    });
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    updateBid,
    getWinningUser,
}