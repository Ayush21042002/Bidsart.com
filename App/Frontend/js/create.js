const url = window.location.href;
const pid = url.split("=")[1];
const createForm = document.getElementById("create-form");

fetchProduct();

async function fetchProduct() {
  // console.log("run");
  // console.log(pid);
  const sid = localStorage.getItem("sid");
  const token = localStorage.getItem("token");
  if(pid && token && sid){
    const response = await fetch("/product/" + pid,{
      method: "GET"
    });

    const json = await response.json();

    // console.log(json.title);

    // console.log(document.getElementById("category"))

    document.getElementById("title-input").value = json.title;
    document.getElementById("description").value = json.description;
    document.getElementById("category").value = json.category;
    const removeNode = document.getElementById("choosefile");
    removeNode.parentNode.removeChild(removeNode);
    document.getElementById("form-head").innerHTML = "EDIT PRODUCT";
    document.getElementById("signup-submit").innerHTML = "SAVE CHANGES";
  }
}

createForm.onsubmit = async(event) => {
    event.preventDefault();

    console.log("HELLO");

    
    // console.log(formData.get("sid"));
    // console.log(formData.get("title"));
    // console.log(formData.get("description"));
    // console.log(formData.get("category"));
    // console.log(formData.getAll("myFiles"));
    

    const token = localStorage.getItem("token");
    const sid = localStorage.getItem("sid");

    if(token && sid){
        if(pid){
          const title = document.getElementById("title-input").value;
          const description = document.getElementById("description").value;
          const category = document.getElementById("category").value;
          const response = await fetch("/product/updateProduct/" + pid, {
            method: "PUT",
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'  
            },
            body: JSON.stringify({
              title,description,category
            })
          });

          let result = await response.json();

          console.log(result);

          if(response.status == 201){
              alert(result.message);
              // form.reset();
              window.location.href = "/index.html"; 
          }else{
              alert(result.message);
          }

        }else{
          let formData = new FormData(createForm);
  
          const response = await fetch('/product/addProduct', {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer ' + token
            },
            body: formData
          });

          let result = await response.json();

          console.log(result);

          if(response.status == 201){
              alert(result.message);
              form.reset();
              window.location.href = "/index.html"; 
          }else{
              alert(result.message);
          }
        }
    }else{
      alert("You need to login as a seller");
      window.location.href = "/index.html";
    }
};