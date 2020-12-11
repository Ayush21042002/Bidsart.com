const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const winningUser = document.getElementById('winning-user');
const winningAmount = document.getElementById("winning-bid");
const chatMessage = document.querySelector(".chat-messages");
const socket = io();
const myBid = document.getElementById("msg");
const increaseBtn = document.getElementById("increase");
var incrementValue = 50;
let winningUserGlobal;
let aidGlobal;
let count = 1;

document.onload = loadProduct();

// TIMER

// var timeleft = 10;
// var downloadTimer = setInterval(function(){
//   if(timeleft <= 0){
//     clearInterval(downloadTimer);

//     invokeAuctionEnd();
//   }
//   document.getElementById("demo").innerHTML = timeleft;
//   timeleft -= 1;
// }, 1000);

socket.on('counter', ({timeleft}) => {
  document.getElementById("demo").innerHTML = timeleft;

  if(timeleft <= 0){
      invokeAuctionEnd();
  }
});

// SOCKET 

//Get Username and room from localstorage
const username = localStorage.getItem("fname") + " " + localStorage.getItem("lname");

const aid = window.location.href.split("=")[1];

const cid = localStorage.getItem("cid");

// Join Chatroom
socket.emit('joinRoom', { cid,username, aid });

// Get room users

socket.on('roomUsers', ({ aid , users, winningUser }) => {
    // console.log(aid);
    outputRoomName(aid);
    if(winningUser)
    {
        outputWinningUser(winningUser);
    }
    outputUsers(users);
});

// Message from server
socket.on('message', message => {
    // console.log(message);
    count = 1;

    if(message.winningUser)
        outputWinningUser(message.winningUser);
    
    outputMessage(message);

    
    if(message.winningUser.cid == localStorage.getItem("cid")){
        document.getElementById("leave-room").disabled = true;
        document.getElementById("send").disabled = true;
        document.getElementById("increase").disabled = true;
    }else{
        document.getElementById("leave-room").disabled = false;
        document.getElementById("send").disabled = false;
        document.getElementById("increase").disabled = false;
    }

    // Scroll down
    chatMessage.scrollTop = chatMessage.scrollHeight;
});

document.getElementById("leave-room").onclick = (event) => {
    event.preventDefault();
    window.location.href = "/index.html";
}

function outputRoomName(room) {
    roomName.innerHTML = room;
    aidGlobal = room;
}

function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}

function outputWinningUser(user) {
    winningUser.innerHTML = `${ user.username }`;
    winningAmount.innerHTML = user.currBid;

    checkCurrentBid(user.currBid);

    saveWinningUser(user);
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
    
    timeleft = 10;

    // Emit message

    if(message){
        socket.emit('chatMessage', message);
    }

    document.getElementById("msg").value = "";

    document.getElementById("msg").focus();
}


function saveWinningUser(user) {
    winningUserGlobal = user;
}

async function invokeAuctionEnd() {
    const cid = localStorage.getItem("cid");
    const token = localStorage.getItem("token");
    if(winningUserGlobal.cid == cid && token){

        if(aidGlobal){
            const reponse = await fetch("/customer/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    aid: aidGlobal
                })
            });
            
            let json = await reponse.json();

            alert(json.message);
            window.location.href = "auction.html";
        }
    }else{
        window.location.href = "../index.html";
    }
}

async function loadProduct(){

    aidGlobal = window.location.href.split("=")[1];

    if(aidGlobal){
        const response = await fetch("/product/getProductByAuctionId/" + aidGlobal, {
            method: "GET"
        });

        const json = await response.json();

        console.log(json);

        document.getElementById("title").innerHTML = json.title;
        document.getElementById("description").innerHTML = json.description;
        document.getElementById("category").innerHTML = json.category;
        document.getElementById("sname").innerHTML = json.artist_name;

        document.getElementById("product-image").src = json.images[0].imageURI;
    }
}


function checkCurrentBid(bid){

    if(bid < 1000){
        incrementValue = 50;
    }else if(bid >= 1000 && bid < 5000){
        incrementValue = 100;
    }else if(bid >= 5000 && bid < 10000){
        incrementValue = 200;
    }else if(bid >=10000 && bid < 50000){
        incrementValue = 500;
    }else if(bid >= 50000 && bid < 100000){
        incrementValue = 1000;
    }else{
        incrementValue = 2000;
    }

    myBid.value = bid + incrementValue;

}

increaseBtn.onclick = (event) => {
    event.preventDefault();

    count++;

    const myBidValue = myBid.value;

    if(count <= 4){
        myBid.value = Number(myBidValue) + incrementValue;
    }
}

document.getElementById("leave-room").onclick = (event)=> {
    event.preventDefault();

    window.location.href = "/";
}