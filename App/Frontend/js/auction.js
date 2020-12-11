document.onload = loaddata();

async function loaddata(){
    const response=await fetch('/product/allAuctions',{
        method: "GET"
    });
    let data=await response.json();
    let message = data.message;
    //console.log(data);
    data = data.auctions;
    for(var i=0;i< data.length;i++){
        creatediv(data[i]);
        //console.log(data[i].minBid);
    }
  }
  
  function creatediv(givendata){
    /* 
        <div class="col-sm-4">
				<div class="card" style="border: none;">
					<div class="img-box" style="height: 14rem;">
					  <img class="card-img-top" src="../images/4.jpg" alt="Card image cap">
					  <div class="image-overlay">
					    <button class="details" style="outline: none;">View Details</button>
					  </div>
					</div>
					<div class="card-body">
						<p class="card-text">Name
						  <br>Artist
						</p>
					</div>
				</div>
		  </div>
    */
      var grandparentdiv = document.getElementById("auction-row");

      var parentdiv = document.createElement('div');
      parentdiv.className = 'col-lg-4';
      grandparentdiv.appendChild(parentdiv);
      // image-button
      var divCard = document.createElement("div");
      divCard.className = "card";
      divCard.style = "border:none";
      parentdiv.appendChild(divCard);

      var imgBox = document.createElement("div");
      imgBox.className = "img-box";
      imgBox.style = "height:14rem;";

      divCard.appendChild(imgBox);
      

      //image 
      var img = document.createElement('img');
      img.className = 'card-img-top';
      img.setAttribute('src' , givendata.imageURI);
      imgBox.appendChild(img);

      
      var overlay = document.createElement("div");
      overlay.className = "image-overlay";
      imgBox.appendChild(overlay);

      var link = document.createElement("a");
      link.href = "./product.html?id="+ givendata.pid;
      link.style = "color:black;";
      link.innerHTML = "View Product<br>";
      
      var details = document.createElement("div");
      details.className = "details";
      details.innerHTML = givendata.startTime.split("T")[0] + " " + givendata.startTime.split("T")[1].split(".")[0] + " UTC";
      overlay.appendChild(details);

      var cardBody = document.createElement("div");
      cardBody.className = "card-body";
      divCard.appendChild(cardBody);

      var p = document.createElement("p");
      p.innerHTML = "Starting Bid: <strong><i class='fas fa-rupee-sign'></i> " + givendata.minBid+ ".00</strong>"
      //bid rate
      
      cardBody.appendChild(p);
      cardBody.appendChild(link);

      //register button
      var button = document.createElement('button');
      button.className = 'register-btn';
      button.innerHTML = 'Register now';

      cardBody.appendChild(button);

      button.onclick = async() => {
        let token = localStorage.getItem("token");
        let cid = localStorage.getItem("cid");
        if(cid && token){
            let reg = {
                aid: givendata.aid
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
  }
