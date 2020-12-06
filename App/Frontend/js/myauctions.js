document.onload = loadauctions();


async function loadauctions(){
    const token = localStorage.getItem("token");
    const cid = localStorage.getItem("cid");
    // console.log(cid, token);
    if(cid && token){
        const response2 = await fetch("/customer/myAuctions", {
            method: "GET",
            headers: {
            'Authorization': 'Bearer ' + token
            },
        });
        let responseJson = await response2.json();
        let auctions = responseJson.auctions;
        // console.log(auctions);
        setauctionproduct(auctions);
    }
}

function setauctionproduct(auctions){
    
    document.getElementById("auctions").innerHTML = "";

    for(let i=0;i<auctions.length;i++){
        auctionCard(auctions[i],auctions[i].imageURI);
    }
    
    /* 
        <!-- <div class="registerproduct">
            <button class="bidbttn"><img class="bidimage" src="" alt="product1"></button>
            <div class="auctionparabttn">
                <div class="paradetails">
                    <h4 class="auctiontime">12hrs sunday</h4>
                    <p>random text</p>

                </div>
                <div class="registerbttn">
                    <button class="registerforbid">Register now</button>
                </div>
            </div>
        </div> -->
    */ 
}

function auctionCard(auction,imageURI){
    var div1 = document.createElement("div");
    div1.className = "registerproduct col-lg-6";
    var btn = document.createElement("button");
    btn.className = "bidbtn";
    var img = document.createElement("img");
    img.className = "bidimage";
    img.src = imageURI;
    btn.append(img);
    div1.append(btn);
    var div2 = document.createElement("div");
    div2.className = "auctionparabttn";
    var div3 = document.createElement("div");
    div3.className = "paradetails";
    var h4d = document.createElement("h4");
    h4d.className = "auctiondate text-white";
    var h4t = document.createElement("h4");
    h4t.className = "auctiontime text-white";
    let datetime = auction.startTime.replace("T"," ").split(".")[0];
    h4d.innerHTML = datetime.split(" ")[0];
    h4t.innerHTML = datetime.split(" ")[1];
    var p = document.createElement("p");
    p.innerHTML = "<i class='fas fa-rupee-sign'></i> " + auction.minBid;
    div3.append(h4d);
    div3.append(h4t);
    div3.append(p);
    div2.append(div3);
    var div4 = document.createElement("div");
    div4.className = "registerbtn";
    var btn2 = document.createElement("button");
    btn2.className = "registerforbid";
    btn2.innerHTML = "Join Now";
    btn2.onclick = async() => {
        let token = localStorage.getItem("token");
        let cid = localStorage.getItem("cid");
        if(cid && token){
            if(new Date().toUTCString() > new Date(datetime).toISOString()){
                window.location = "/html/chatroom.html?aid=" + auction.aid;
            }else{
                alert("The auction has not started yet");
            }
        }
    };
    div4.appendChild(btn2);
    div2.appendChild(div4);
    div1.appendChild(div2);
    document.getElementById("auctions").appendChild(div1);
}