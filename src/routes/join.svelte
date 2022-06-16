<script>
	let email;
	let password;
	let password2;
	let showError = false;
	let errorMsg = '';
	let borderColor = '#dbdbdb';

	// A function that sends a post request to the server to create a new user.
	function join() {
		console.log(email, password);
		// post username and password to server to get jwt
		fetch('http://192.168.0.13:8080/join', {
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
				console.log(data);
				window.location.pathname = '/login';
			})
			.catch((err) => {
				if (err.status == 500) {
					showError = true;
					errorMsg = 'Something went wrong.';
				} else if (err.status == 409) {
					showError = true;
					errorMsg = 'User already exists, try <a href="/login">logging</a> in';
				}
			});
	}

	// This function is checking if the two password inputs are the same. If they are not, the border
	// color of the second password input will be changed to red.
	function checkPWD() {
		if (password != password2) {
			borderColor = '#ff8484';
		} else {
			borderColor = '#dbdbdb';
		}
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
			<input type="password" name="password" class="password" bind:value={password} />
		</div>
		<div class="inputs">
			<label for="password">Confirm Password</label>
			<input
				type="password"
				name="password"
				class="password"
				bind:value={password2}
				on:keyup={checkPWD}
				style="border-color: {borderColor};"
			/>
		</div>
		{#if showError}
			<div id="error">
				{@html errorMsg}
			</div>
		{/if}
	</div>
	<div id="button_box">
		<div class="button" style="background: #6b8fff;" on:click={join}>Join</div>
	</div>
</div>

<style>
	input:focus {
		outline: none;
	}
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
		justify-content: center;
		max-width: 60%;
		min-width: 300px;
		margin: auto;
		margin-top: 50px;
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
	#error {
		font-size: 13px;
		border: 2px solid #ff8484;
		border-radius: 3px;
		padding: 5px;
		font-family: 'Roboto', sans-serif;
		color: #4e4e4e;
		margin-bottom: -25px;
	}
</style>
