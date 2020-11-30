document.onload = fetchOrders();

async function fetchOrders(){

    const cid = localStorage.getItem("cid");
    const token = localStorage.getItem("token");

    if(cid && token){
        const response = await fetch("/customer/myOrders",{
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const json = await response.json();

        // console.log(json);

        const orders = json.orders;
        console.log(orders);
        
        for(let i=0;i<orders.length;i++){
            addProduct(orders[i].imageURI,orders[i].title,
                orders[i].pid,orders[i].Orderid,orders[i].amount,
                orders[i].paid,orders[i].invoiceURI);
        }
    }

}

function addProduct(imgURL,title,pid,Orderid,amount,paid,invoice){
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
                    <p class="card-text">
                        <span id="title">NAME</span><br>
                        <span id="amount"><i class="fas fa-rupee-sign"></i> 150</span><br>
                        <button class="btn-secondary p-3" style="width: 100%;" id="payNow">Pay Now</button>
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
    btn.href = "./product.html?type=" + pid;
    btn.style.outline='none';
    btn.innerHTML='View Details';
    div4.appendChild(btn);
    div3.appendChild(div4);
    div2.appendChild(div3);
    let div5=document.createElement('div');
    div5.className='card-body';
    let p=document.createElement('p');
    p.className='card-text';
    let span1 = document.createElement("span");
    span1.id = "title";
    span1.innerHTML = title;
    p.appendChild(span1);
    
    if(paid == 0){
        let payBtn = document.createElement("button");
        payBtn.className = "btn btn-secondary p-3 text-white";
        payBtn.innerHTML = "PAY " + amount;
        payBtn.style = "width: 100%";
        payBtn.id = "payNow";
        payBtn.onclick = async(event) => {
            event.preventDefault();

            const cid = localStorage.getItem("cid");
            const token = localStorage.getItem("token");

            if(cid && token){
                const response = await fetch("/customer/pay",{
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount,pid,Orderid
                    })
                });

                const json = await response.json();

                console.log(json.redirect);
                window.open(json.redirect, '_blank');
            }

            console.log("PAYING NOW !!!!!!!!!!!");
            console.log("FOR ORDERID ",Orderid);
        };
        p.appendChild(payBtn);    
    }else{
        let span1 = document.createElement("div");
        span1.id = "amount";
        span1.innerHTML = "<i class='fas fa-rupee-sign'></i> " + amount;
        p.appendChild(span1);
        let a = document.createElement("a");
        a.className = "btn btn-primary";
        a.innerHTML = "INVOICE";
        a.href = invoice;
        a.target = "_blank";
        p.appendChild(a);
    }
    div5.appendChild(p);
    div2.appendChild(div5);
    newDiv.appendChild(div2);
    let x=document.querySelector('.orders-row');
    x.appendChild(newDiv);
}