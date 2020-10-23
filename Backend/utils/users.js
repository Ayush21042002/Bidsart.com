const con = require("../database/db");

//Join User to chat

function userJoin(id,customerId, username, room) {
    const user = { id,customerId, username, room, Bid: 0 };

    console.log(user);

    return new Promise((resolve,reject) => {
            con.query("DELETE FROM auctionLog WHERE room = ? AND customerId = ?", [room,customerId], (err,result) => {
                if(err) reject(err);

                con.query("INSERT INTO auctionLog SET ?;",user, (err,result) => {
                    if(err) reject(err);

                    resolve(user);
                });
            });
    });
}

// Get Current User

function getCurrentUser(id) {
    return new Promise((resolve,reject) => {
        con.query("SELECT * FROM auctionLog WHERE id = ?", [id], (err,result) => {
            if(err) reject(err);

            resolve(result[0]);
        });
    })
}

// User Leaves 

function userLeave(id) {
    return new Promise((resolve,reject) => {
        con.query("SELECT * FROM auctionLog where id = ?",[id], (err,result) => {
            if(err || result.length == 0) reject(err);

            const user = result[0];

            con.query("DELETE FROM auctionLog where id = ?",[id], (err,resdel) => {
                if(err) reject(err);

                resolve(user);
            });
        });
    });
}

// Get Room Users

function getRoomUsers(room) {
    return new Promise((resolve,reject) => {
        con.query("SELECT * FROM auctionLog WHERE room = ?;",[room], (err,result) => {
            if(err) reject(err);

            resolve(result);
        });
    });
}

function updateBid(id, Bid) {
    return new Promise((resolve,reject) => {
        con.query("UPDATE auctionLog set Bid = ? where id = ?",[Bid,id], (err,result) => {
            if(err) reject(err);

            resolve(result.insertId);
        });
    });
}

function getWinningUser(room) {
    return new Promise((resolve,reject) => {
        con.query("SELECT * FROM auctionLog WHERE room = ? AND Bid = (SELECT MAX(Bid) FROM auctionLog where room = ?);",[room,room], (err,result) => {
            if(err) reject(err);
            console.log(result[0]);
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