<script>
	let email;
	let password;
	let showError = false;
	let errorMsg = '';
	let stayLoggedIn = false;

	// A function that sends a post request to the server to get the jwt.
	function login() {
		console.log(email, password);
		// post username and password to server to get jwt
		fetch('http://192.168.0.13:8080/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email, password: password })
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(res);
			})
			.then((data) => {
				if (stayLoggedIn) {
					localStorage.setItem('token', data.token);
				} else {
					sessionStorage.setItem('token', data.token);
				}
				window.location.pathname = '/dashboard';
			})
			.catch((err) => {
				if (err.status == 401) {
					console.log('Make account');
					console.log(err);
					showError = true;
					errorMsg = 'Error: please make sure your login information is correct.';
				}
			});
	}
</script>

<div id="contents">
	<div id="title">CLORA</div>
	<div id="inputs">
		<div class="inputs">
			<label for="email">Email</label>
			<input type="email" name="email" id="email" bind:value={email} />
		</div>
		<div class="inputs">
			<label for="password">Password</label>
			<input type="password" name="password" id="password" bind:value={password} />
		</div>
		{#if showError}
			<div id="error">
				{errorMsg}
			</div>
		{/if}
	</div>
	<div id="sli">
		<input type="checkbox" name="stay" id="stay" bind:checked={stayLoggedIn} />
		<label for="stay">Stay logged in?</label>
	</div>
	<div id="button_box">
		<div class="button" style="background: #ff6b6b;" on:click={login}>Login</div>
		<a href="/join"><div class="button" style="background: #6b8fff;">Join</div></a>
	</div>
</div>

<style>
	#title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 40px;
		color: #333333;
		padding: 10px;
		background: #212121;
		width: 150px;
		margin-top: 100px;
		margin-left: 10%;
	}
	#contents {
		width: 500px;
		max-width: 90%;
		height: 600px;
		margin: auto;
		margin-top: 100px;
		border: 2px solid #dbdbdb;
		border-radius: 7px;
	}
	#inputs {
		font-size: 20px;
		font-family: 'Space Grotesk', sans-serif;
		color: #8a8a8a;
		max-width: 60%;
		min-width: 300px;
		margin: auto;
		margin-top: 70px;
	}
	.inputs {
		display: grid;
		margin: auto;
		margin-bottom: 20px;
	}
	input {
		width: 100%;
		border: 2px solid #dbdbdb;
		border-radius: 4px;
		padding: 4px;
	}
	#button_box {
		display: flex;
		justify-content: space-between;
		max-width: 60%;
		min-width: 300px;
		margin: auto;
		margin-top: 20px;
	}
	.button {
		width: 120px;
		height: 40px;
		border-radius: 4px;
		color: #ffffff;
		font-family: 'Roboto', sans-serif;
		line-height: 40px;
		font-size: 20px;
		text-align: center;
		cursor: pointer;
		user-select: none;
	}
	a {
		text-decoration: none;
	}
	#error {
		font-size: 13px;
		border: 2px solid #ff8484;
		border-radius: 3px;
		padding: 5px;
		font-family: 'Roboto', sans-serif;
		color: #4e4e4e;
	}
	#sli {
		display: flex;
		max-width: 60%;
		min-width: 300px;
		margin: auto;
		margin-top: 10px;
		font-family: 'Roboto', sans-serif;
		font-size: 13px;
		color: #707070;
		line-height: 20px;
	}
	#stay {
		width: 15px;
		margin-right: 11px;
	}
</style>
