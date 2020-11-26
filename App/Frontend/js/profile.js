const url = window.location.href;
const type = url.split("=")[1];

let userDetails;

document.onload = loadValues();

async function loadValues(){
  if(type == "seller"){
    const token = localStorage.getItem("token");
    const sid = localStorage.getItem("sid");
    if(token && sid){
      const response = await fetch("/seller/details",{
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const json = await response.json();
      userDetails = json;
      // console.log(json);
      document.getElementById("email-input").value = localStorage.getItem("email");
      document.getElementById("artistname-input").value = json.name;
      document.getElementById("bankname-input").value = json.bankName;
      document.getElementById("accNo-input").value = json.accNo;
      document.getElementById("altcontact-input").value = json.contact2;
      document.getElementById("address-input").value = json.addrLine;
      document.getElementById("city-input").value = json.city;
      document.getElementById("state-input").value = json.state;
      document.getElementById("zipcode-input").value = json.zip;
      document.getElementById("landmark-input").value = json.landmark;
      document.getElementById("contact-input").value = json.contact1;
      document.getElementById("panNo-input").value = json.panNo;
    }
  }else if(type == "customer"){
    const token = localStorage.getItem("token");
    const cid = localStorage.getItem("cid");
    if(token && cid){
      const response = await fetch("/customer/details",{
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const json = await response.json();
      userDetails = json;
      // console.log(json);
      document.getElementById("email-input").value = localStorage.getItem("email");
      document.getElementById("fname-input").value = json.fname;
      document.getElementById("lname-input").value = json.lname;
      document.getElementById("country-input").value = json.country;
      document.getElementById("countrycode-input").value = json.coCode;
      document.getElementById("address-input").value = json.addLine;
      document.getElementById("city-input").value = json.city;
      document.getElementById("state-input").value = json.state;
      document.getElementById("zipcode-input").value = json.zip;
      document.getElementById("landmark-input").value = json.landmark;
      document.getElementById("contact-input").value = json.contact;
    }
  }
}

function validateForm() {
	// trim to remove the whitespaces
	const addressVal=document.getElementById("address-input").value.trim();
	const cityVal=document.getElementById("city-input").value.trim();
	const stateVal = document.getElementById("state-input").value.trim();
	const countryVal=document.getElementById("country-input").value.trim();
	const zipVal=document.getElementById("zipcode-input").value.trim();
	const contactVal=document.getElementById("contact-input").value.trim();
	let isaddressValsuccess=false;
	let iscityValsuccess=false;
	let isstateValsuccess=false;
	let iscountryValsuccess=false;
	let iszipValsuccess=false;
  let iscontactValsuccess=false;
  
  if(contactVal===""){
    alert('Contact cannot be left blank')
    iscontactValsuccess=false;
  }
  else if(contactVal.length!==10 && isNaN(contactVal) ){
    alert('Contact should be of type numbers and should be of 10 digits')
    iscontactValsuccess=false;
  }
  else{
    iscontactValsuccess=true;
  }

	if(addressVal===""){
		alert("Address field cannot be left blank");
		isaddressValsuccess=false;
	}
	else{
		isaddressValsuccess=true;
  }
  
	if(cityVal===""){
		alert("Enter Your City");
		iscityValsuccess=false;
	}
	else{
		iscityValsuccess=true;
  }
  
	if(stateVal===""){
		alert("Enter Your State");
		isstateValsuccess = false;
	}
	else{
		isstateValsuccess = true;
	}
	
	if(countryVal===""){
		alert("Enter Your Country");
		iscountryValsuccess=false;
	}
	else{
		iscountryValsuccess=true;
	}
	
	if(zipVal===""){
		alert("Enter your Zip code");
		iszipValsuccess=false;
	}
	else{
		iszipValsuccess = true;
	}

	if(type==="customer"){
    const firstNameVal = document.getElementById("fname-input").value.trim();
    const countrycodeVal=document.getElementById('countrycode-input').value.trim();
		let iscountrycodeValsuccess=false;
    let isfirstNameValsuccess=false;
    
		if(countrycodeVal===""){
			alert('Country code cannot be blank');
			iscountrycodeValsuccess = false;
		}
		else if(countrycodeVal.length>3){
        alert('Country code length should be strictly less than 4');
        iscountrycodeValsuccess = false;
			}
		else {
			iscountrycodeValsuccess=true;
		}	
		if(firstNameVal === ""){
      alert("First Name cannot be blank");
      isfirstNameValsuccess = false;
    }else{
      isfirstNameValsuccess = true;
    }

    // console.log(iscountryValsuccess);
    // console.log(isfirstNameValsuccess);
    // console.log(isaddressValsuccess);
    // console.log(iscityValsuccess);
    // console.log(isstateValsuccess);
    // console.log(iszipValsuccess);
    // console.log(iscountrycodeValsuccess);
    // console.log(iscontactValsuccess);

    if(isfirstNameValsuccess && isaddressValsuccess && iscityValsuccess && isstateValsuccess && iscountryValsuccess && iscountrycodeValsuccess && iscontactValsuccess && iszipValsuccess){
      return true;
    }else{
      return false;
    }
	}
	
	if(type==='seller'){
		const contact2Val=document.getElementById("altcontact-input").value.trim();
		const artistNameVal=document.getElementById("artistname-input").value.trim();
		let iscontact2Valsuccess=false;
    let isartistNameValsuccess=false;
     ///contact verification
		if(contact2Val.length > 0 && isNaN(contact2Val)){
      alert("Alternate Contact should be of type numbers and of 10 digits");
    }else{
      iscontact2Valsuccess = true;
    }
	 ///artist name
	 if(artistNameVal===""){
     alert("Mention Artist's name");
     isartistNameValsuccess = false;
	 }
	 else{
		 isartistNameValsuccess = true;
   }
   
   if(isartistNameValsuccess && isaddressValsuccess && iscityValsuccess && isstateValsuccess && iscountryValsuccess && iscontactValsuccess && iscontact2Valsuccess && iszipValsuccess){
      return true;
    }else{
      return false;
    }

	}
  
  return false; // case when type is not seller or customer
}


if (type === 'seller')
{    
    //  removing f and l name 
    var myobj = document.getElementsByClassName("fandlname");
    myobj[0].remove();


    //making artist name feild visible
    var artistName= document.getElementsByClassName('artistname');
    artistName[0].style.visibility='visible';



    //  making country input field INDIA
    document.getElementById("country-input").value = "INDIA";

    // making country code 91
    document.getElementById("countrycode-input").value = "91";


    // making accountinfo feild vissible
    var accInfo= document.getElementsByClassName('accountinfo');
    accInfo[0].style.visibility='visible';
 

    //  toggling margin for better alignment 
    var codeCountry= document.getElementsByClassName('codecontact');
    codeCountry[0].style.marginTop='5em';

    
}



if(type === 'customer')
{

    document.getElementsByClassName("altcontact")[0].style.visibility = "hidden";

    var myobj = document.getElementsByClassName("artistname");
    myobj[0].remove();
    
    var myobj2 = document.getElementsByClassName("accountinfo");
    myobj2[0].remove();
    var codeCountry= document.getElementsByClassName('codecontact');
    codeCountry[0].style.marginTop='5em';
   var fandlname=document.getElementsByClassName('fandlname');
    fandlname[0].style.marginTop='5em';
}

var editButton = document.getElementById("edit");
var cancelButton = document.getElementById("cancel");
var saveButton = document.getElementById("save");

editButton.onclick = (event) => {
  event.preventDefault();

  document.getElementById("address-input").removeAttribute('readonly');
  document.getElementById("city-input").removeAttribute('readonly');
  document.getElementById("state-input").removeAttribute('readonly');
  document.getElementById("zipcode-input").removeAttribute('readonly');
  document.getElementById("landmark-input").removeAttribute('readonly');
  document.getElementById("contact-input").removeAttribute('readonly');

  if(type == "seller"){
    document.getElementById("artistname-input").removeAttribute('readonly');
    document.getElementById("bankname-input").removeAttribute('readonly');
    document.getElementById("accNo-input").removeAttribute('readonly');
    document.getElementById("altcontact-input").removeAttribute('readonly');
  }else if(type == "customer"){
    document.getElementById("fname-input").removeAttribute('readonly');
    document.getElementById("lname-input").removeAttribute('readonly');
    document.getElementById("country-input").removeAttribute('readonly');
    document.getElementById("countrycode-input").removeAttribute('readonly');
    
  }

  editButton.style = "display: none;"
  cancelButton.style = "display: inline-block;";
  saveButton.style = "display: inline-block;"; 
}


cancelButton.onclick = (event) => {
  event.preventDefault();

  document.getElementById("address-input").readOnly = true;
  document.getElementById("city-input").readOnly = true;
  document.getElementById("state-input").readOnly = true;
  document.getElementById("zipcode-input").readOnly = true;
  document.getElementById("landmark-input").readOnly = true;
  document.getElementById("contact-input").readOnly = true;

  if(type == "seller"){
    document.getElementById("artistname-input").readOnly = true;
    document.getElementById("bankname-input").readOnly = true;
    document.getElementById("accNo-input").readOnly = true;
    document.getElementById("altcontact-input").readOnly = true;

    if(userDetails){
      // initial values for seller
      // document.getElementById("email-input").value = localStorage.getItem("email");
      document.getElementById("artistname-input").value = userDetails.name;
      document.getElementById("bankname-input").value = userDetails.bankName;
      document.getElementById("accNo-input").value = userDetails.accNo;
      document.getElementById("altcontact-input").value = userDetails.contact2;
      document.getElementById("address-input").value = userDetails.addrLine;
      document.getElementById("city-input").value = userDetails.city;
      document.getElementById("state-input").value = userDetails.state;
      document.getElementById("zipcode-input").value = userDetails.zip;
      document.getElementById("landmark-input").value = userDetails.landmark;
      document.getElementById("contact-input").value = userDetails.contact1;
      // document.getElementById("panNo-input").value = json.panNo;
  
    }
  }else if(type == "customer"){
    document.getElementById("fname-input").readOnly = true;
    document.getElementById("lname-input").readOnly = true;
    document.getElementById("country-input").readOnly = true;
    document.getElementById("countrycode-input").readOnly = true;

    if(userDetails){
      // document.getElementById("email-input").value = localStorage.getItem("email");
      document.getElementById("fname-input").value = userDetails.fname;
      document.getElementById("lname-input").value = userDetails.lname;
      document.getElementById("country-input").value = userDetails.country;
      document.getElementById("countrycode-input").value = userDetails.coCode;
      document.getElementById("address-input").value = userDetails.addLine;
      document.getElementById("city-input").value = userDetails.city;
      document.getElementById("state-input").value = userDetails.state;
      document.getElementById("zipcode-input").value = userDetails.zip;
      document.getElementById("landmark-input").value = userDetails.landmark;
      document.getElementById("contact-input").value = userDetails.contact;
    }
    
  }

  editButton.style = "display:inline-block";
  cancelButton.style = "display:none";
  saveButton.style = "display:none"; 
};

const changeDetailsForm = document.getElementById("myForm");

saveButton.onclick = async(event) => {
  event.preventDefault();
  
  // console.log("HI");

  // console.log(validateForm());

  if(validateForm()){
    if(type == "seller"){
      const sid = localStorage.getItem("sid");
      const token = localStorage.getItem("token");
      if(sid && token){
        
        let reqBody = {
          artist_name: document.getElementById("artistname-input").value,
          addressLine: document.getElementById("address-input").value,
          city: document.getElementById("city-input").value,
          state: document.getElementById("state-input").value,
          zip: document.getElementById("zipcode-input").value,
          contact1: document.getElementById("contact-input").value,
          landmark: document.getElementById("landmark-input").value,
          bankName: document.getElementById("bankname-input").value,
          accNo: document.getElementById("accNo-input").value,
          contact2: document.getElementById("altcontact-input").value
        };

        const response = await fetch("/seller/update",{
          method: "PUT",
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqBody)
        });

        const json = await response.json();

        if(response.status == 200){
          alert(json.message);
          loadValues();
          cancelButton.click();
        }else{
          alert(json.message);
        }
      }
    }else if(type == "customer"){
      const cid = localStorage.getItem("cid");
      const token = localStorage.getItem("token");
      if(cid && token){
        
        let reqBody = {
          fname: document.getElementById("fname-input").value,
          lname: document.getElementById("lname-input").value,
          addressLine: document.getElementById("address-input").value,
          city: document.getElementById("city-input").value,
          state: document.getElementById("state-input").value,
          country: document.getElementById("country-input").value,
          zip: document.getElementById("zipcode-input").value,
          countrycode: document.getElementById("countrycode-input").value,
          contact: document.getElementById("contact-input").value,
          landmark: document.getElementById("landmark-input").value
        };

        const response = await fetch("/customer/update",{
          method: "PUT",
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqBody)
        });

        const json = await response.json();

        if(response.status == 200){
          alert(json.message);
          loadValues();
          cancelButton.click();
        }else{
          alert(json.message);
        }
      }
    }
  }
};