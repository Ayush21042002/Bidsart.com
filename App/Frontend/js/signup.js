const form1 = document.getElementById('form1');
const username1 = document.getElementById('username1');
const email1 = document.getElementById('email1');
const insertbefore=email1.parentElement;
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const address=document.getElementById('addressLine');
const insertbefore1=address.parentElement;
const city=document.getElementById('city');
const state = document.getElementById("state");
const country=document.getElementById('country');
const zip=document.getElementById('zip');
const lastName=document.getElementById('username3');
const landmark=document.getElementById('landmark');
const url = window.location.href;
const type = url.split("=")[1];

// DOM elements adding according to type of user
if(type==="customer"){
	// adding contact countrycode 
	let createDiv=document.createElement("div");
	createDiv.className="signUpbox"
	let Label=document.createElement("label")
		Label.for="Country code"
		Label.innerHTML="Country Code <span>&#42;</span>"
		createDiv.appendChild(Label);
		let input = document.createElement("input");
	   input.className = "input1";
	   input.id="Countrycode"
	   input.type = "Number";
	   input.name = "countrycode";
	   input.placeholder = "Enter your CountryCode   Ex:+91,+89";
	   createDiv.appendChild(input);
	    let small=document.createElement("small")
	   small.innerHTML="Error Message"
	   createDiv.appendChild(small);
	 form1.insertBefore(createDiv,insertbefore)

	// contact
	 createDiv=document.createElement("div");
	createDiv.className="signUpbox"
	 Label=document.createElement("label")
		Label.for="contact"
		Label.innerHTML="Contact <span>&#42;</span>"
		createDiv.appendChild(Label);
		input = document.createElement("input");
        input.className = "input1";
		input.type = "tel";
		input.id="contact"
        input.name = "contact";
		input.placeholder = "Enter yout contact no.";
		createDiv.appendChild(input);
		 small=document.createElement("small")
		small.innerHTML="Error Message"
		createDiv.appendChild(small);
	  form1.insertBefore(createDiv,insertbefore)

}

else if(type==="seller"){
	const fName=document.getElementById('username1').parentElement;
		// console.log(fName);
		fName.remove();
		const lName=document.getElementById('username3').parentElement;
		lName.remove();
		country.value = "India";
		country.readOnly = true;
		  //artist name 
		 let  createDiv=document.createElement("div");
		  createDiv.className="signUpbox"
		   let Label=document.createElement("label")
			  Label.for="Artist name"
			  Label.innerHTML="Artist Name<span>&#42;</span>"
			  createDiv.appendChild(Label);
			  input = document.createElement("input");
			  input.className = "input1";
			  input.id="artistname"
			  input.type = "text";
			  input.name = "Artist name";
			  input.placeholder = "Artist Name";
			  createDiv.appendChild(input);
		let  small=document.createElement("small")
			 small.innerHTML="Error Message"
			 createDiv.appendChild(small);
		   form1.insertBefore(createDiv,insertbefore)
	//Contact 1
	 createDiv=document.createElement("div");
	createDiv.className="signUpbox"
	  Label=document.createElement("label")
		Label.for="contact"
		Label.innerHTML="Contact <span>&#42;</span>"
		createDiv.appendChild(Label);
		input = document.createElement("input");
        input.className = "input1";
        input.type = "tel";
		input.name = "contact";
		input.id="contact1"
		input.placeholder = "Enter yout contact no.";
		createDiv.appendChild(input);
	 small=document.createElement("small")
		small.innerHTML="Error Message"
		createDiv.appendChild(small);
	  form1.insertBefore(createDiv,insertbefore1)
	 
	 //contact2
	 createDiv=document.createElement("div");
	 createDiv.className="signUpbox"
	  Label=document.createElement("label")
		 Label.for="contact"
		 Label.innerHTML="Alternate Contact"
		 createDiv.appendChild(Label);
		 input = document.createElement("input");
		 input.className = "input1";
		 input.type = "tel";
		 input.name = "contact2";
		 input.id="contact2"
		 input.placeholder = "Enter your alternate contact no.";
		 createDiv.appendChild(input);
		  small=document.createElement("small")
		 small.innerHTML="Error Message"
		 createDiv.appendChild(small);
	   form1.insertBefore(createDiv,insertbefore1)

	 
	//pan no.
	createDiv=document.createElement("div");
	createDiv.className="signUpbox"
	 Label=document.createElement("label")
		Label.for="pan"
		Label.innerHTML="PAN No.<span>&#42;</span>"
		createDiv.appendChild(Label);
		input = document.createElement("input");
        input.className = "input1";
		input.type = "text";
		input.id="pan_num"
        input.name = "pan_num";
		input.placeholder = "Enter Your Pan Number";
		createDiv.appendChild(input);
		small=document.createElement("small")
	   small.innerHTML="Error Message"
	   createDiv.appendChild(small);
	 form1.insertBefore(createDiv,insertbefore1)

// These details are for transferring money earned after auction to seller 

	//  accountNumber
	
	createDiv=document.createElement("div");
	createDiv.className="signUpbox";
	 Label=document.createElement("label")
		Label.for="accountNo"
		Label.innerHTML="Account No."
		createDiv.appendChild(Label);
		input = document.createElement("input");
		input.className = "input1";
		input.type = "number";
		input.id="accountNo"
        input.name = "account_number";
		input.placeholder = "Enter your Account Number";
		createDiv.appendChild(input);
		small=document.createElement("small")
	   small.innerHTML="Error Message"
	   createDiv.appendChild(small);
	 form1.insertBefore(createDiv,insertbefore1);
	
	 // bank Name
	
	createDiv=document.createElement("div");
	createDiv.className="signUpbox";
	 Label=document.createElement("label")
		Label.for="bankName"
		Label.innerHTML="Bank Name"
		createDiv.appendChild(Label);
		input = document.createElement("input");
		input.className = "input1";
		input.type = "text";
		input.id="bankName"
        input.name = "bank_name";
		input.placeholder = "Enter the Bank Name";
		createDiv.appendChild(input);
		small=document.createElement("small")
	   small.innerHTML="Error Message"
	   createDiv.appendChild(small);
	 form1.insertBefore(createDiv,insertbefore1);
		
}

function checkInputs1() {
	// trim to remove the whitespaces
	let usernameVal = username1.value.trim();
	const emailVal = email1.value.trim();
	const passwordVal = password1.value.trim();
	const passwordVal2 = password2.value.trim();
	const addressVal=address.value.trim();
	const cityVal=city.value.trim();
	const stateVal = state.value.trim();
	const countryVal=country.value.trim();
	const zipVal=zip.value.trim();
	const lastNameVal=lastName.value.trim();
	const landmarkVal=landmark.value.trim();
	let isUsernamesuccess=false;
    let isEmailsuccess=false;
	let isPassword1success=false;
	let isPassword2success=false;
	let isaddressValsuccess=false;
	let iscityValsuccess=false;
	let isstateValsuccess=false;
	let iscountryValsuccess=false;
	let iszipValsuccess=false;
	if(type==="customer"){
		const countrycodeVal=document.getElementById('Countrycode').value.trim();
		const contactVal=document.getElementById('contact').value.trim();
		let iscountrycodeValsuccess=false;
		let iscontactValsuccess=false;
		
		if(countrycodeVal===""){
			setErrorFor1(document.getElementById('Countrycode'),'Country code cannot be blank')
			iscountrycodeValsuccess = false;
		}
		else if(countrycodeVal.length>3){
				setErrorFor1(document.getElementById('Countrycode'),'Country code length should be strictly less than 4')
			}
		else {
			setSuccessFor1(document.getElementById('Countrycode'));
			iscountrycodeValsuccess=true;
		}
		if(contactVal===""){
			setErrorFor1(document.getElementById('contact'),'Contact cannot be left blank')
			iscontactValsuccess=false;
		}

		else if(contactVal.length!==10 && isNaN(contactVal) ){
			setErrorFor1(document.getElementById('contact'),'Contact should be of type numbers and should be of 10 digits')
			iscontactValsuccess=false;
		}
		else{
			setSuccessFor1(document.getElementById('contact'));
			iscontactValsuccess=true;
		}
	
		if(lastNameVal !== ""){
			setSuccessFor1(lastName);
		}
	}
	
	if(type==='seller'){
		usernameVal = document.getElementById("artistname").value;
		isUsernamesuccess=false
		const Pan=document.getElementById('pan_num');
		const artistName=document.getElementById('artistname');
		const contact2=document.getElementById('contact2')
		let contact2Val=contact2.value.trim();
		let artistNameVal=artistName.value.trim();
		let panVal=Pan.value.trim();
		const contactVal=document.getElementById('contact1').value.trim();
		let iscontactValsuccess=false;
     ///contact verification
		if(contactVal===""){
			setErrorFor1(document.getElementById('contact1'),'Contact cannot be left blank')
			iscontactValsuccess=false;
		}
	
		else if(contactVal.length!==10 || isNaN(contactVal) ){
		  setErrorFor1(document.getElementById('contact1'),'Contact should be of type numbers and should be of 10 digits')
		  iscontactValsuccess=false;
		}
		else{
			setSuccessFor1(document.getElementById('contact1'));
			iscontactValsuccess=true;
		}
		if(contact2Val!==""&&contact2Val.length===10 && isNaN(!contact2Val)){
         setSuccessFor1(contact2);
		}
	 ///artist name
	 if(artistNameVal===""){
		 setErrorFor1(artistName,"Mention Artist's name")
	 }
	 else{
		 setSuccessFor1(artistName);
	 }
	 ///Pan verification
	 if(panVal===""){
		 setErrorFor1(Pan,'Pan number field should not be blank');
	 }
        
	 if(panVal.length===10){
	   let x=panVal.slice(0,5);
	   let y=panVal.slice(5,9);
	   let z=panVal.slice(9,10);
	   let isfirstValid=false;
	   let issecondValid=false;
	   let isthirdValid=false;
       if(allLetter(x)){
        isfirstValid=true;
	   }
	   if(!isNaN(y)){
		   issecondValid=true;
	   }
	  if(allLetter(z)){
		  isthirdValid=true;
	  }
	  if(isfirstValid&&issecondValid&&isthirdValid){
		  setSuccessFor1(Pan);
	  }
	  else{
		  setErrorFor1(Pan,'Enter a valid Pan no.')
	  } 
	 }
	 else{
		 setErrorFor1(Pan,"Enter a valid Pan no.");
	 }
	}

	
	if(emailVal === '') {
		setErrorFor1(email1, 'Email cannot be blank');
		isEmailsuccess=false;
	} else if (!isEmail(emailVal)) {
		setErrorFor1(email1, 'Not a valid email');
		isEmailsuccess=false;
	} else {
		setSuccessFor1(email1);
		isEmailsuccess=true;
	}

	if(usernameVal === '') {
		setErrorFor1(username1, 'Username cannot be blank');
		isUsernamesuccess=false;
	}else {
		setSuccessFor1(username1);
		isUsernamesuccess = true;
	}

	if(addressVal===""){
		setErrorFor1(address,"Address field cannot be left blank")
		isaddressValsuccess=false;
	}
	else{
		setSuccessFor1(address);
		isaddressValsuccess=true;
	}
	if(cityVal===""){
		setErrorFor1(city,"Enter Your City");
		iscityValsuccess=false;
	}
	else{
		setSuccessFor1(city);
		iscityValsuccess=true;
	}
	if(stateVal===""){
		setErrorFor1(state,"Enter Your State");
		isstateValsuccess = false;
	}
	else{
		setSuccessFor1(state);
		isstateValsuccess = true;
	}

	
	if(countryVal===""){
		setErrorFor1(country,"Enter Your Country")
		iscountryValsuccess=false;
	}
	else{
		setSuccessFor1(country);
		iscountryValsuccess=true;
	}
	
	if(zipVal===""){
		setErrorFor1(zip,"Enter your Zip code");
		iszipValsuccess=false;
	}
	else{
		setSuccessFor1(zip);
		iszipValsuccess = true;
	}

	if(passwordVal === '') {
		setErrorFor1(password1, 'Password cannot be blank');
		isPassword1success=false;
	}
	else if(passwordVal.length<8){
     setErrorFor1(password1,"minimum password length should be of 8 characters");
	}
	 else {
		setSuccessFor1(password1);
		isPassword1success=true;
	}
	
	if(passwordVal2 === '') {
		setErrorFor1(password2, 'Password2 cannot be blank');
		isPassword2success=false;
	}
	else if(passwordVal.length<8){
		setErrorFor1(password2,"minimum password length should be of 8 characters");
	}
	 else if(passwordVal !== passwordVal2) {
		setErrorFor1(password2, 'Passwords does not match');
		isPassword2success=false;
	} else{
		setSuccessFor1(password2);
		isPassword2success=true;
	}


	if(landmarkVal!==''){
		setSuccessFor1(landmark);
	}

	// console.log(isPassword1success);
	// console.log(isPassword2success);
	// console.log(isUsernamesuccess);
	// console.log(isEmailsuccess);
	// console.log(isaddressValsuccess);
	// console.log(iscityValsuccess);
	// console.log(isstateValsuccess);
	// console.log(iscountryValsuccess);
	// console.log(iszipValsuccess);
	
	
	if(isPassword2success&&isUsernamesuccess&&isEmailsuccess&&isPassword1success&&isaddressValsuccess&&isstateValsuccess&&iscountryValsuccess&&iszipValsuccess&&iscityValsuccess){
		return true;
	}
	else 
		return false;
}

function setErrorFor1(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'signUpbox error1';
	small.innerText = message;
}

function setSuccessFor1(input) {
	const formControl = input.parentElement;
	formControl.className = 'signUpbox success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function allLetter(inputtxt)
  {
   var letters = /^[A-Z]+$/;
   if(inputtxt.match(letters))
     {
      return true;
     }
   else
     {
     return false;
     }
  }


form1.addEventListener('submit', async function(e) {
	e.preventDefault();
	if(checkInputs1()==false){
		console.log("wrong");
	}
	else{
		if(type==="customer"){
				let customer = {
					email:email1.value,
					password: password1.value,
					fname: username1.value,
					lname: lastName.value,
					contact: document.getElementById('contact').value,
					countrycode: document.getElementById('Countrycode').value,
					addressLine: address.value,
					city: city.value,
					state: state.value,
					country: country.value,
					zip: zip.value,
					landmark: landmark.value
				};

				const response  = await fetch("/customer/signup",{
					method:"POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(customer)
				});

				const json = await response.json();

				if(response.status == 201){
					form1.reset();     
					alert(json.message);
					window.location.href = "/index.html";	
				}else if(response.status == 200){
					form1.reset();     
					alert(json.message);
					window.location.href = "index.html";
				}else{
					alert(json.message);
				}

		}else if(type == "seller"){

			let seller = {
				email:email1.value,
				password: password1.value,
				artist_name: document.getElementById('artistname').value,
				contact1: document.getElementById('contact1').value,
				contact2: document.getElementById('contact2').value,
				addressLine: address.value,
				city: city.value,
				state: state.value,
				zip: zip.value,
				landmark: landmark.value,
				pan_num: document.getElementById('pan_num').value,
				account_no: document.getElementById('accountNo').value,
				bank_name: document.getElementById('bankName').value
			};

			console.log("seller",seller);

			const response  = await fetch("/seller/signup",{
				method:"POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(seller)
			});

			const json = await response.json();

			if(response.status == 201){
					form1.reset();     
					alert(json.message);
					window.location.href = "/index.html";	
				}else if(response.status == 200){
					form1.reset();     
					alert(json.message);
					window.location.href = "/index.html";
				}else{
					alert(json.message);
				}
		}
	}
});