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

module.exports = (server) => {
    const io = socketio(server);

    const auctionHead = "Auction Head";

    io.on('connection', (socket) => {
        
        socket.on('joinRoom', async({customerId,username,room}) => {
            const user = await userJoin(socket.id,customerId,username,room);
            console.log(user,"after execution");
            const winningUser = await getWinningUser(room);
            console.log(winningUser);

            socket.join(user.room);

            socket.emit('message', formatMessage(auctionHead, 'WELCOME TO AUCTION', winningUser));

            // BRODCAST WHEN USER CONNECTS
            socket.broadcast.to(user.room).emit('message', formatMessage(auctionHead, `${user.username} has joined the auction`,winningUser));

            // Send users in room

            const userInRoom = await getRoomUsers(user.room);
            console.log(userInRoom);

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: userInRoom,
                winningUser,
            });
        });

        socket.on('chatMessage', async(msg) => {
            const user = await getCurrentUser(socket.id);
            updateBid(socket.id, msg)
            .then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            });
            const winningUser = await getWinningUser(user.room);

            io.to(user.room).emit('message', formatMessage(user.username,msg,winningUser));
        });

        socket.on('disconnect', async() => {
            const user = await userLeave(socket.id);

            if(user) {
                const winningUser = await getWinningUser(user.room);

                io.to(user.room).emit('message', formatMessage(auctionHead, `${user.username} has left the auction`,winningUser));
                
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: await getRoomUsers(user.room),
                    winningUser,
                });
            }
        });
    });

};