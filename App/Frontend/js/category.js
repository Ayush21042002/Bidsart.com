const url=window.location.href;
const type=url.split("=")[1];
var count=0;
var container=document.querySelector('.container');            
async function catchJson(){
  const response=await fetch('/product',{
     method: "GET"
  });
  const data=await response.json();
  if(type==='painting'){
      document.querySelector('div h3').innerHTML="PAINTINGS";
      
      for(var i=0;i<data.length;i++){
         let category=data[i].category;
         if(category==="painting"){
            let imgLink= data[i].images[0].imageURI;
            let title=data[i].title;
            count++;
            addProduct(imgLink,title,data[i].pid);

         }    
      }
  }
  else if(type==="handicrafts"){
    document.querySelector('div h3').innerHTML="HANDICRAFTS";
      
    for(var i=0;i<data.length;i++){
       let category=data[i].category;
       if(category==="handicrafts"){
          let imgLink= data[i].images[0].imageURI;
          let title=data[i].title;
          count++;
          addProduct(imgLink,title,data[i].pid);

       }    
    }
  }

  else if(type==='sculptures'){
    document.querySelector('div h3').innerHTML="SCULPTURES";
      
    for(var i=0;i<data.length;i++){
       let category=data[i].category;
       if(category==="sculptures"){
          let imgLink= data[i].images[0].imageURI;
          let title=data[i].title;
          count++;
          addProduct(imgLink,title,data[i].pid);

       }    
    }
  }
}

catchJson().catch(error=>{
    console.log('error!');
    console.error(error);
});
///ADD PRODUCT
function addProduct(imgURL,title,id){
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
    newDiv.appendChild(div2);
    let x=document.querySelector('.product-row');
    x.appendChild(newDiv);
} 

