



const $signInForm = document.querySelector('#sign-in-form');



$signInForm.addEventListener('submit', async (e) =>{
	document.getElementById("error").style.display = "none";
	error.innerHTML = '<ul>';
	e.preventDefault();
	
	const data = {
		name: document.getElementById('name').value,
		age: document.getElementById('age').value,
		email: document.getElementById('email').value,
		password: document.getElementById('pass').value
	}

	if (samePass() == false){
		document.getElementById("error").style.display = "block";
		error.innerHTML += `<li>Passwords must be the same!</li>`;
		
	}
	if(validateAge() == false){
		document.getElementById("error").style.display = "block";
		error.innerHTML += `<li>Age must be valid whole number!</li>`;
	}
	else{
		try{
			const rawRes = await fetch('/users',{
				method: 'post',
				headers: {
					'Accept': 'application/json',
					"Content-Type": "application/json; charset=utf-8"
					},
				body: JSON.stringify(data)
			})
			const res = await rawRes.json();
			if (res.errors){
				for (var key in res.errors){
					var value = res.errors[key]
					document.getElementById("error").style.display = "block";
	
					error.innerHTML += '<li>' + value.message +'</li>';
					console.log(value);
					console.log(res);
					return;
				}
			}else{
				error.innerHTML = '<li>Account successfully created</li>';
				document.getElementById("error").style.background = "green";
				document.getElementById("error").style.display = "block";

			}
			error.innerHTML += '</ul>';
			//window.location = "intent://example.com#Intent;schemehttp;/path"
	
		}
		catch(error){
			error.innerHTML = 'Something went wrong. . .';
			console.log(error);
		}
	}

});


const samePass = () => {
	const pass = document.getElementById('pass').value;
	const confirmPass = document.getElementById('confirm-pass').value;
	if (pass !== confirmPass){
		console.log('Passwords must be the same')
		//set error message here
		return false;
	}
	return true
}


const validateAge = () =>{
	
	//returns true for not a number so we are saying if it is a number ensure its an int
	if(!isNaN(document.getElementById('age').value)){
		return true;
	}
	return false;
}