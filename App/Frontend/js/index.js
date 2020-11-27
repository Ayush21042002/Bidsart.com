var URL=window.location.href;
var page=URL.split("/")[1];
// FOR MYDASHBOARD
// <!-- <div class="dropdown-menu" aria-labelledby="navbarDropdown">
// <a class="dropdown-item" href="#">Action</a>
// <a class="dropdown-item" href="#">Another action</a>
// <div class="dropdown-divider"></div>
// <a class="dropdown-item" href="#">Something else here</a>
// </div> -->
var SID=localStorage.getItem('sid');
// console.log(SID);
var bigDiv=document.getElementById("dashboard-li");
if(page==="index.html"){
if(SID){
  let newDiv=document.createElement('div');
      newDiv.className="dropdown-menu";
      newDiv.setAttribute('aria-labelledby',"navbarDropdown");
      let newA=document.createElement('a');
      newA.className="dropdown-item";
      newA.innerHTML="My Details";
      newA.href="html/profile.html?type=seller"
      newDiv.appendChild(newA);
      let newA1=document.createElement('a');
      newA1.className="dropdown-item";
      newA1.innerHTML="My Products";
      newA1.href="html/myproducts.html?sid=" + SID;
      newDiv.appendChild(newA1);
      let newA2=document.createElement('a');
      newA2.className="dropdown-item";
      newA2.innerHTML="Add Product"
      newA2.href="html/create.html"
      newDiv.appendChild(newA2);
      bigDiv.appendChild(newDiv);
}
else{
  let newDiv=document.createElement('div');
      newDiv.className="dropdown-menu";
      newDiv.setAttribute('aria-labelledby',"navbarDropdown");
      let newA=document.createElement('a');
      newA.className="dropdown-item";
      newA.innerHTML="Registered Auctions";
      newA.href="html/registeredAuctions.html"
      newDiv.appendChild(newA);
      let newA1=document.createElement('a');
      newA1.className="dropdown-item";
      newA1.innerHTML="My details";
      newA1.href="html/profile.html?type=customer"
      newDiv.appendChild(newA1);
      let newA3 = document.createElement("a");
      newA3.classList = "dropdown-item";
      newA3.innerHTML = "My Orders";
      newA3.href = "html/myOrders.html";
      newDiv.appendChild(newA3);
      bigDiv.appendChild(newDiv);
}
}
else{
if(SID){
  let newDiv=document.createElement('div');
      newDiv.className="dropdown-menu";
      newDiv.setAttribute('aria-labelledby',"navbarDropdown");
      let newA=document.createElement('a');
      newA.className="dropdown-item";
      newA.innerHTML="My Details";
      newA.href="../html/profile.html?type=seller"
      newDiv.appendChild(newA);
      let newA1=document.createElement('a');
      newA1.className="dropdown-item";
      newA1.innerHTML="My Products";
      newA1.href="../html/myproducts.html?sid=" + SID;
      newDiv.appendChild(newA1);
      let newA2=document.createElement('a');
      newA2.className="dropdown-item";
      newA2.innerHTML="Add Product"
      newA2.href="../html/create.html"
      newDiv.appendChild(newA2);
      bigDiv.appendChild(newDiv);
}
else{
  let newDiv=document.createElement('div');
      newDiv.className="dropdown-menu";
      newDiv.setAttribute('aria-labelledby',"navbarDropdown");
      let newA=document.createElement('a');
      newA.className="dropdown-item";
      newA.innerHTML="Registered Auctions";
      newA.href="../html/registeredAuctions.html"
      newDiv.appendChild(newA);
      let newA1=document.createElement('a');
      newA1.className="dropdown-item";
      newA1.innerHTML="My details";
      newA1.href="../html/profile.html?type=customer"
      newDiv.appendChild(newA1);
      let newA3 = document.createElement("a");
      newA3.classList = "dropdown-item";
      newA3.innerHTML = "My Orders";
      newA3.href = "../html/myOrders.html";
      newDiv.appendChild(newA3);
      bigDiv.appendChild(newDiv);
}
}