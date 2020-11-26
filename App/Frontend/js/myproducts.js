const url=window.location.href;
const sid=url.split("=")[1];
var count=0;
var container=document.querySelector('.container');            
async function catchJson(){
    if(isNaN(sid) == false){
        const response=await fetch('/seller/myProducts/' + sid,{
            method: "GET"
        });
        const data=await response.json();
        let paintingCount = 0,handicraftCount = 0,sculptureCount = 0;
        for(var i=0;i<data.length;i++){
            category=data[i].category;
            if(category==="painting"){
                paintingCount+=1;
                let imgLink= data[i].images[0].imageURI;
                // console.log(data[i].images);
                let title=data[i].title;
                addProduct(imgLink,title,data[i].pid,category);
            }else if(category==="handicrafts"){
                handicraftCount+=1;
                let imgLink= data[i].images[0].imageURI;
                let title=data[i].title;
                // console.log(imgLink,title);
                addProduct(imgLink,title,data[i].pid,category);
            }else{
                sculptureCount+=1;
                let imgLink= data[i].images[0].imageURI;
                let title=data[i].title;
                // console.log(imgLink,title);
                addProduct(imgLink,title,data[i].pid,category);
            }
            count++;
            if(paintingCount > 0){
                document.getElementById("painting").innerHTML = "Paintings";
            }
            if(sculptureCount > 0){
                document.getElementById("sculptures").innerHTML = "Sculptures";
            }
            if(handicraftCount > 0){
                document.getElementById("handicrafts").innerHTML = "Handicrafts";
            }
      } 
    }
}

catchJson().catch(error=>{
    console.log('error!');
    console.error(error);
});
///ADD PRODUCT
function addProduct(imgURL,title,id,type){
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
                    <button id="schedule" class="bg-secondary">SCHEDULE AN AUCTION</button>
				</div>
		  </div>
   */
    let newDiv=document.createElement('div');
    newDiv.className="col-sm-4";
    let div2=document.createElement('div');
    div2.className='card';
    div2.style.border='none';
    let div3=document.createElement('div');;
    div3.className='img-box';
    div3.style.height='14rem';
    let  img=document.createElement('img');
    img.className='card-img-top';
    img.setAttribute('src',imgURL);
    img.setAttribute('alt',"Card image cap");
    div3.appendChild(img);
    let div4=document.createElement('div');
    div4.className="image-overlay";
    let btn=document.createElement('a');
    btn.className='details';
    btn.href = "./product.html?type=" + id;
    btn.style.outline='none';
    btn.innerHTML='View Details';
    div4.appendChild(btn);
    div3.appendChild(div4);
    div2.appendChild(div3);
    let div5=document.createElement('div');
    div5.className='card-body';
    let p=document.createElement('p');
    p.className='card-text';
    p.innerHTML=title;
    div5.appendChild(p);
    div2.appendChild(div5);
    /*
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Open
        modal for @mdo</button>
    */
    let btn2 = document.createElement("button");
    btn2.className = "bg-secondary text-white p-3";
    btn2.id = "schedule";
    btn2.setAttribute("data-toggle","modal");
    btn2.setAttribute("data-target","#exampleModal");
    btn2.onclick = (event) => {
        event.preventDefault();

        document.getElementById("pid").value = id;
    };
    btn2.innerHTML = "SCHEDULE AN AUCTION";
    div2.appendChild(btn2);
    newDiv.appendChild(div2);
    console.log('.product-row-' + type);
    let x=document.querySelector('.product-row-' + type);
    x.appendChild(newDiv);
} 

const scheduleForm = document.getElementById("schedule-form");

scheduleForm.onsubmit = async(event) => {
    event.preventDefault();

    var pid = document.getElementById("pid").value;

    var minBid = document.getElementById("minBid").value;

    var startTime = document.getElementById("startTime").value;
    
    var token = localStorage.getItem("token");

    var sid = localStorage.getItem("sid");

    if(pid && minBid && startTime && sid && token){

        const response = await fetch("/product/registerauction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({pid,minBid,startTime})
        });

        const json = await response.json();

        alert(json.message);

        if(response.status == 201){
            window.location.href = "/index.html";
        }

        document.getElementById("minBid").value = "";

        document.getElementById("startTime").value = "";
    }
};  