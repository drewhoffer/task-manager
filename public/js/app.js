



const $signInForm = document.querySelector('#sign-in-form');



$signInForm.addEventListener('submit', async (e) =>{
	error.innerHTML = '';
	e.preventDefault();
	const data = {
		name: document.getElementById('name').value,
		age: document.getElementById('age').value,
		email: document.getElementById('email').value,
		password: document.getElementById('pass').value
	}

	if (samePass()){
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
			for (var key in res.errors){
				var value = res.errors[key]
				error.innerHTML += '<ul><li>' + value.message +'</li>';
				console.log(value);
			}
			error.innerHTML += '</ul>';
			console.log(res);
		}
		catch(error){
			error.innerHTML = 'Something went wrong. . .';
			console.log(error);
		}
		
	}
	else{
		console.log('need to match passwords')
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