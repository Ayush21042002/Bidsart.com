const url=window.location.href;
const type=url.split("=")[1];
const scheduleForm = document.getElementById("schedule");


async function loadproduct(){
    const response=await fetch("/product/" + type,{
        method: "GET"
    });
    let respText = await response.json();
    respText = respText[0];
    productSid = respText.sid;
    console.log("running");
    checkLogin();
    console.log("running");
    setimages(respText);
    settext(respText);
    loadauctions(respText);
}

async function loadauctions(respText){
    const response2 = await fetch("/product/getAuctionsByProduct/" + type, {
        method: "GET"
    });
    let responseJson = await response2.json();
    let auctions = responseJson.auctions;
    setauctionproduct(auctions,respText.images[0]);
}

loadproduct().catch(error=>{
    console.log('error!');
    console.error(error);
});

function setimages(pathlink){
    
    var images = document.querySelector(".carousel-inner");
    for(let i=0;i<pathlink.images.length;i++){
        var div = document.createElement("div");
        if(i == 0){
            div.className = "carousel-item active";
        }else{
            div.className = "carousel-item";
        }
        var img = document.createElement("img");
        img.className = "images mt-3";
        img.src = pathlink.images[i].imageURI;
        div.append(img);
        images.append(div);
    }
}

function settext(pathtext){

    document.getElementById('productid').innerHTML = pathtext.pid;
    document.getElementById('title').innerHTML = pathtext.title;
    document.getElementById('category').innerHTML = pathtext.category.toUpperCase();
    document.getElementById('description').innerHTML = pathtext.description;

}

function setauctionproduct(auctions,image){
    
    document.getElementById("auctions").innerHTML = "";

    for(let i=0;i<auctions.length;i++){
        auctionCard(auctions[i],image.imageURI);
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
    h4d.className = "auctiondate";
    var h4t = document.createElement("h4");
    h4t.className = "auctiontime";
    let datetime = auction.startTime.replace("T"," ").split(".")[0];
    h4d.innerHTML = datetime.split(" ")[0];
    h4t.innerHTML = datetime.split(" ")[1];
    var p = document.createElement("p");
    p.innerHTML = auction.minBid + " Rupees";
    div3.append(h4d);
    div3.append(h4t);
    div3.append(p);
    div2.append(div3);
    var div4 = document.createElement("div");
    div4.className = "registerbtn";
    var btn2 = document.createElement("button");
    btn2.className = "registerforbid";
    btn2.innerHTML = "Register Now";
    btn2.onclick = async() => {
        let token = localStorage.getItem("token");
        let cid = localStorage.getItem("cid");
        if(cid && token){
            let reg = {
                aid: auction.aid
            };
            const resp = await fetch("/product/bookAuction", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
				},
				body: JSON.stringify(reg)
            })
            const json = await resp.json();
            alert(json.message);
        }else{
            alert("You need to login as a customer");
        }
    };
    div4.appendChild(btn2);
    div2.appendChild(div4);
    div1.appendChild(div2);
    document.getElementById("auctions").appendChild(div1);
}


/*---------------------------
|  another way to load data |
---------------------------*/


// var xhr = new XMLHttpRequest();
// xhr.open('GET', '../json/products.json' ,true);

// xhr.onload = function (){
//     var respText = JSON.parse(this.responseText);
//     // console.log(respText);
//     var size = respText.length;
//     for(var i=0;i<size;i++){
//         var currentid = respText[i].productId;
//         if(type == currentid){
              
//             // var img = document.getElementById('mainimage');
//             // img.setAttribute('src' ,respText[i].images[0].imageURI);
//             setimages(respText[i]);
//             settext(respText[i]);           
//         }
        
//     }
    
// }
// xhr.send();

/*------------------
|  create element  |
------------------*/
// var alldiv = document.getElementsByClassName('griditems');
    // var newdiv = document.createElement('div');
    // newdiv.className = "content";
    // alldiv[1].appendChild(newdiv);

    // var output = '';
    // output += `<ul>
    //         <li><h1><span>`+ pathtext.category + `</span></h1></li>
    //         <hr>
    //         <li><h3>Title: `+ pathtext.title + `</h3></li>
    //         <li><h3>name of artist: ______</h3></li>
    //         <li><h3>description of art:`+ pathtext.description + `</h3></li>
    //         <hr>
    //         </ul>`
    // newdiv.innerHTML = output;