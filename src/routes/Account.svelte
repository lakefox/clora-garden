<script>
	function logOut() {
		sessionStorage.removeItem('token');
		localStorage.removeItem('token');
		window.location.pathname = '/login';
	}

	function deleteAccount() {
		fetch('http://192.168.0.13:8080/leave', {
			method: 'GET',
			headers: {
				authorization: sessionStorage.getItem('token') || localStorage.getItem('token')
			}
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(res);
			})
			.then((data) => {
				sessionStorage.removeItem('token');
				localStorage.removeItem('token');
				window.location.pathname = '/login';
			})
			.catch((err) => {
				if (err.status == 401 || err.status == 401) {
					window.location.reload();
				}
			});
	}
</script>

<div id="container">
	<div id="title">Account</div>
	<div id="contents">
		<div class="button" style="background: #68e492;" on:click={logOut}>Log out</div>
		<div class="button" style="background: #ff6b6b;" on:click={deleteAccount}>Delete Account</div>
	</div>
</div>

<style>
	#container {
		width: 97%;
		min-height: 97%;
		background: #fff;
		margin: auto;
		margin-top: 1.5%;
		border-radius: 10px;
		margin-bottom: 1.5%;
		padding-bottom: 30px;
	}
	#title {
		font-size: 50px;
		padding: 20px;
		font-family: 'Roboto', sans-serif;
		color: #212121;
		margin-bottom: 50px;
	}
	#contents {
		display: flex;
	}
	.button {
		width: 118px;
		height: 30px;
		border-radius: 4px;
		color: #ffffff;
		font-family: 'Roboto', sans-serif;
		line-height: 30px;
		font-size: 16px;
		text-align: center;
		cursor: pointer;
		user-select: none;
		margin-left: 20px;
		padding: 3px;
	}
</style>
