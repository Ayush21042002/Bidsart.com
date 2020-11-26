const createForm = document.getElementById("create-form");

createForm.onsubmit = async(event) => {
    event.preventDefault();

    let formData = new FormData(createForm);
  
    // console.log(formData.get("sid"));
    // console.log(formData.get("title"));
    // console.log(formData.get("description"));
    // console.log(formData.get("category"));
    // console.log(formData.getAll("myFiles"));
    

    const token = localStorage.getItem("token");

    if(token){
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
    }else{
      alert("You need to login as a seller");
      window.location.href = "/index.html";
    }
};