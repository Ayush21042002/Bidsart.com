// const { addProduct } = require("../../controllers/add-product.controller");

document.onload = loadNewProducts()

async function loadNewProducts(){
    // for this to work atleast 9 products should be there in the inventory
    const response = await fetch("/product/newArrival",{
        method: "GET"
    });

    const json = await response.json();
    var count = 0,row_number = 1;
    var length = (json.length < 9) ? json.length : 9;
    for(let i=0;i<length;i++){
        if(count != 0 && count%3 == 0){
            row_number++;
        }
        addNewProduct("row-" + row_number,json[i]);
        count++;
    }
}

function addNewProduct(rowid,product){
    var col = document.createElement("div");
    col.className = "col-sm-4";
    var card = document.createElement("div");
    card.className="card";
    card.style = "box-shadow: 0px 3.8px 10px rgba(0,0,0,0.5);";
    col.appendChild(card);
    var imgBox = document.createElement("imgBox");
    imgBox.className = "img-box";
    imgBox.style = "height: 14rem";
    card.appendChild(imgBox);
    var img = document.createElement("img");
    img.className = "card-img-top";
    img.src = product.images[0].imageURI;
    img.alt = product.title;
    imgBox.appendChild(img);
    var overlay = document.createElement("div");
    overlay.className = "image-overlay";
    imgBox.appendChild(overlay);
    var btn = document.createElement("button");
    btn.className = "details";
    btn.style = "outline: none";
    btn.innerHTML = "View Details";
    btn.onclick = (event) => {
        window.location.href = "/html/product.html?type=" + product.pid;
    };
    overlay.appendChild(btn);
    var body = document.createElement("div");
    body.className = "card-body";
    card.appendChild(body);
    var p = document.createElement("p");
    p.className = "card-text";
    p.style = "margin-top: 1px";
    p.innerHTML = product.title;
    body.appendChild(p);
    document.getElementById(rowid).appendChild(col);
}
/* 
    <div class="col-sm-4">
        <div class="card"  style="box-shadow: 0px 3.8px 10px rgba(0,0,0,0.5);">
            <div class="img-box" style="height: 14rem">
                <img
                class="card-img-top" 
                src="images/paintings4.jpg"
                alt="Card image cap"
                />
                <div class="image-overlay">
                    <button class="details" style="outline: none">
                        View Details
                    </button>
                </div>
            </div>
            <div class="card-body">
                <p class="card-text" style="margin-top: 1px">Jungle Safari</p>
            </div>
        </div>
    </div>
*/