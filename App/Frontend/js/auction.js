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
  
  loaddata().catch(error=>{
      console.log('error!');
      console.error(error);
  });


  function creatediv(givendata){

      console.log(givendata);
      var grandparentdiv = document.getElementsByClassName("gridmain")[0];

      var parentdiv = document.createElement('div');
      parentdiv.className = 'gridcon';
      grandparentdiv.appendChild(parentdiv);
      // image-button
      var bttn = document.createElement('button');
      bttn.className="bttn";
      parentdiv.appendChild(bttn);

      //image 
      var img = document.createElement('img');
      img.className = 'bidimage';
      img.setAttribute('src' , givendata.imageURI);
      bttn.appendChild(img);

      //auction time
      var scheduletime = document.createElement('div');
      scheduletime.className ='schedule';
      var date = givendata.startTime.split("T")[0];
      var time = givendata.startTime.split("T")[1].split(".")[0] + " UTC";
      var text = `<p><strong>`+date +` </strong><strong>`+time+`</strong></p>`;
      scheduletime.innerHTML = text;;
      parentdiv.appendChild(scheduletime);
    
      //bid rate
      var bidrate = document.createElement('div');
      bidrate.className = 'bidrate';
      text = `<p  class="text-success">Starting Bid: <strong><i class="fas fa-rupee-sign"></i> `+givendata.minBid+`.00</strong></p>`;
      bidrate.innerHTML = text;
      parentdiv.appendChild(bidrate);

      //register button
      var button = document.createElement('button');
      button.className = 'bidbttn';
      button.innerHTML = 'Register now';
      parentdiv.appendChild(button);

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
