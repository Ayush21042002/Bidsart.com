///var for later uses in validation
const form = document.getElementById("form");
var email = document.getElementById("email");
var password = document.getElementById("password");
var checkbox = document.getElementById("exampleCheck1");
const logoutLi = document.getElementById("logout-li");
const loginLi = document.getElementById("login-li");
const logout = document.getElementById("logout");
const signupLi = document.getElementById("signup-li");
const dashboardLi = document.getElementById("dashboard-li");

form.onsubmit = async(event) => {
  event.preventDefault();

  if(checkInputs()) {
    var credentials = {
      email: email.value,
      password: password.value
    };

    var userType = "customer";

    if($('input[name="check"]:checked').length > 0){
      userType = "seller";
    }

    const response = await fetch("/" + userType +"/login",{       // /customer/login or /seller/login
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(credentials)
    });

    const json = await response.json();

    console.log(json);

    if(userType == "seller"){
        if(response.status == 200){
        localStorage.setItem("token",json.token);
        localStorage.setItem("sid",json.sid);
        localStorage.setItem("email",json.email);
        localStorage.setItem("artistName",json.artist_name);
        
        loginLi.style = "display:none;";
        signupLi.style = "display:none;";
        logoutLi.style = "display:inline;";
        dashboardLi.style = "display:inline;";
        
        alert("You will be redirected to Main Page");

        window.location.href = "/index.html";
        }else{
          alert(json.message);
        }
    }else if(userType == "customer"){
      if(response.status == 200){
        localStorage.setItem("token",json.token);
        localStorage.setItem("cid",json.cid);
        localStorage.setItem("email",json.email);
        localStorage.setItem("fname",json.CustomerName.fname);
        localStorage.setItem("lname",json.CustomerName.lname);
        
        loginLi.style = "display:none;";
        signupLi.style = "display:none;";
        logoutLi.style = "display:inline;";
        dashboardLi.style = "display:inline;";
        alert("You will be redirected to Main Page");

        window.location.href = "/index.html";
        }else{
          alert(json.message);
        }
    }
    email.value = "";
    password.value = "";
    
    $('input[name="check"]').prop('checked', false);

    $('#loginModal').modal( 'hide' );
  }else{
    setTimeout(function(){
      document.getElementById("error1").innerHTML = "";
      document.getElementById("error2").innerHTML = "";
      email.style.border = "1.4px solid black";
      password.style.border = "1.4px solid black";
    }, 3000);
  }
}
 
document.getElementsByClassName("modal fade")[0].addEventListener('click',function(e){
  e.stopPropagation();
})
document.onload = checkLogin()

function checkLogin(){
    const token = localStorage.getItem("token");
    // console.log(token);

    if(token){
        loginLi.style = "display:none";
        signupLi.style = "display:none";
        logoutLi.style = "display:inline";
        dashboardLi.style = "display:inline";
    }
}

function checkInputs() {
  const emailValue = email.value.trim(); ///trim used for deleting unnecessary spacetabs..
  const passwordValue = password.value.trim();
  var error1 = false;
  var error2 = false;
  var success1 = false;
  var success2 = false;
  if (emailValue === "") {
    error1 = setErrorFor(email, "Email cannot be blank");
  } else if (!isEmail1(emailValue)) {
    error1 = setErrorFor(email, "Not a valid email");
  } else {
    success1 = setSuccessFor(email);
  }

  if (passwordValue === "") {
    error2 = setErrorFor(password, "Password cannot be blank");
  } else {
    success2 = setSuccessFor(password);
  }

  if (error1 || error2) {
    return false;
  } else if (success1 && success2) {
    return true;
  }
}
///will disply the error message by adding error-message class of css
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.classList.add("error-message");
  small.innerText = message;
  input.style.border = "1.4px solid red";
  return true;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.classList.remove("error-message");
  input.style.border = "1.4px solid green";
  return true;
}

function isEmail1(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}



logout.onclick = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    
    // FOR SELLER CASE
    localStorage.removeItem("sid");
    localStorage.removeItem("artistName");
    

    // FOR CUSTOMER CASE

    localStorage.removeItem("cid");
    localStorage.removeItem("fname");
    localStorage.removeItem("lname");


    loginLi.style = "display:inline;";
    signupLi.style = "display:inline;";
    logoutLi.style = "display:none;";
    dashboardLi.style = "display:none;";  

    alert("You will be redirected to Main Page");

    window.location.href = "/index.html";
};

