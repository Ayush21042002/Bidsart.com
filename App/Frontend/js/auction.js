async function loaddata(){
    const response=await fetch('/product/allAuctions',{
        method: "GET"
    });
    let data=await response.json();
    let message = data.message;
    console.log(data);
    data = data.auctions;
    for(var i=0;i< data.length;i++){
        creatediv(data[i]);
    }
  }
  
  loaddata().catch(error=>{
      console.log('error!');
      console.error(error);
  });

  function creatediv(givendata){

    //   console.log(givendata.startTime);
      var newdiv = document.createElement('div');
      newdiv.className = 'con';
      document.getElementsByClassName("gridcon")[0].appendChild(newdiv);
      var bttn = document.createElement('button');
      bttn.className ='imagebttn'; 
      newdiv.appendChild(bttn)
      var img = document.createElement('img');
      img.className = 'bidimage';
      img.setAttribute('src' , givendata.imageURI);
      bttn.appendChild(img);

      var h41 = document.createElement("h4");
      h41.className = "auctiondate";
      h41.innerHTML = givendata.startTime.split("T")[0];
    //   console.log(givendata.startTime.replace("T"," ").split(".")[0]);

      var h42 = document.createElement("h4");
      h42.className = "auctiontime";
      h42.innerHTML = givendata.startTime.split("T")[1].split(".")[0] + " UTC";
      

      var p = document.createElement("p");
      p.innerHTML = " <i class='fas fa-rupee-sign'></i> " + givendata.minBid;
    
      newdiv.appendChild(h41);
      newdiv.appendChild(h42);
      newdiv.appendChild(p);
      
      var button = document.createElement('button');
      button.className = 'bidbttn';
      button.innerHTML = 'Register now';
      newdiv.appendChild(button);

      bttn.onclick = function(){
        var str1 = "./product.html?id=";
        var str2 = givendata.pid;
        var link = str1+str2;
       window.location.href = link ;
      }

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
