const socketio = require("socket.io");  // impoting socketio for Live-Chat

const {
     userJoin, 
     getCurrentUser, 
     userLeave, 
     getRoomUsers, 
     updateBid, 
     getWinningUser } = require('./utils/users');

const formatMessage = require('./utils/messages');
const con = require("./database/db");
const { use } = require("./routes/seller");

module.exports = (server) => {
    const io = socketio(server);

    const auctionHead = "Auction Head";

    /*
        var timeleft = 10;
        var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);

            invokeAuctionEnd();
        }
        document.getElementById("demo").innerHTML = timeleft;
        timeleft -= 1;
        }, 1000);

    */
    var timeleftArray = {};
    io.on('connection', (socket) => {
        
        socket.on('joinRoom', ({cid,username,aid}) => {

            timeleftArray[aid] = 60;

            var downloadTimer = setInterval(function(){
                if(timeleftArray[aid] <= 0){
                    clearInterval(downloadTimer);
                }
                console.log(timeleftArray[aid]);
                io.to(aid).emit('counter', {
                    timeleft: timeleftArray[aid]
                });
                timeleftArray[aid] -= 1;
            }, 1000);

            console.log("USER WITH "+ cid + " " + username + " JOINING " + aid," 22");
            userJoin(socket.id,cid,username,aid)
            .then(user => {
                console.log(user," JOINED 25");
                timeleftArray[aid] = 60;
                getWinningUser(aid)
                .then(winningUser => {
                    console.log("CURRENT WINNER ",winningUser," 28");
                    console.log(user.aid," 29");
                    socket.join(user.aid);

                    socket.emit('message', formatMessage(auctionHead, 'WELCOME TO AUCTION', winningUser));

                    // BRODCAST WHEN USER CONNECTS
                    socket.broadcast.to(user.aid).emit('message', formatMessage(auctionHead, `${user.username} has joined the auction`,winningUser));

                    // Send users in room

                    getRoomUsers(user.aid)
                    .then(userInRoom => {
                        console.log("USERS IN ROOM ",userInRoom," 41");
                        // console.log(room)
                        io.to(user.aid).emit('roomUsers', {
                            aid: user.aid,
                            users: userInRoom,
                            winningUser
                        });
                    }).catch(err => {
                        console.log(err," 49");
                    });
                }).catch(err => {
                    console.log(err," 52");
                });
            }).catch(err => {
                console.log(err," 55");
            });
        });

        socket.on('chatMessage', (message) => {
            getCurrentUser(socket.id)
            .then(user => {
                console.log(user," in ",user.aid," sent ",message," 62");

                updateBid(socket.id, message,user.aid)
                .then(data => {
                    timeleftArray[user.aid] = 30;
                    io.to(user.aid).emit('counter', {
                        timeleft: timeleftArray[user.aid]
                    });
                    getWinningUser(user.aid)
                    .then(winningUser => {
                            console.log("WINNER AFTER MESSAGE ",winningUser," 68");
                            io.to(user.aid).emit('message', formatMessage(user.username,message,winningUser));
                        }).catch(err => {
                            console.log(err," 71");
                        });
                    }).catch(err => {
                        console.log(err," 74");
                    });
                }).catch(err => {
                    console.log(err," 77");
                });
        });

        socket.on('disconnect', async() => {
            getCurrentUser(socket.id)
            .then(user => {
                console.log("USER BEING DELETED ",user," 84");
                userLeave(socket.id)
                .then(userDeleted => {
                    console.log(user," USER LEFT"," 87");

                    getWinningUser(user.aid)
                    .then(winningUser => {
                        io.to(user.aid).emit('message', formatMessage(auctionHead, `${user.username} has left the auction`,winningUser));
                        
                        getRoomUsers(user.aid)
                        .then(userInRoom => {
                            io.to(user.aid).emit('roomUsers', {
                                room: user.aid,
                                users: userInRoom,
                                winningUser,
                            });
                        }).catch(err => {
                            console.log(err," 101");
                        });
                    }).catch(err => {
                        console.log(err," 104");
                    });
                }).catch(err => {
                    console.log(err," 107");
                });
            }).catch(err => {
                console.log(err," 111");
            });          
        });
    });

};