const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const winningUser = document.getElementById('winning-user');
const chatMessage = document.querySelector(".chat-messages");
const socket = io();

// TIMER

var timeleft = 60;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
  }
  document.getElementById("demo").innerHTML = timeleft;
  timeleft -= 1;
}, 1000);

// SOCKET 

//Get Username and room from localstorage
const username = localStorage.getItem("fname") + " " + localStorage.getItem("lname");

const aid = localStorage.getItem("aid");

const cid = localStorage.getItem("cid");

// Join Chatroom
socket.emit('joinRoom', { cid,username, aid });

// Get room users

socket.on('roomUsers', ({ aid , users, winningUser }) => {
    console.log(aid);
    outputRoomName(aid);
    if(winningUser)
    {
        outputWinningUser(winningUser);
    }
    outputUsers(users);
});

// Message from server
socket.on('message', message => {
    console.log(message);

    if(message.winningUser)
        outputWinningUser(message.winningUser);
    
    outputMessage(message);

    // Scroll down
    chatMessage.scrollTop = chatMessage.scrollHeight;
});

document.getElementById("leave-room").onclick = (event) => {
    event.preventDefault();
    window.location.href = "/index.html";
}

function outputRoomName(room) {
    roomName.innerHTML = room;
}

function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}

function outputWinningUser(user) {
    winningUser.innerHTML = `${ user.username }`;
}

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="text-white">${message.username} <span>${message.time}</span></p>
                    <p class="text-white">
                        <i class="fas fa-rupee-sign"></i> ${message.text}
                    </p>.`;
    document.querySelector('.chat-messages').appendChild(div);

    chatMessage.scrollTop = chatMessage.scrollHeight;
}

document.getElementById("send").onclick = event => {
    event.preventDefault();

    let message = document.getElementById("msg").value;
    
    timeleft = 60;

    // Emit message

    if(message){
        socket.emit('chatMessage', message);
    }

    document.getElementById("msg").value = "";

    document.getElementById("msg").focus();
}

