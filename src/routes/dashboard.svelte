<script>
	import Sidebar from './Sidebar.svelte';
	import { selectedMenuOption, menuOptions, gardens } from '../stores';
	import NewProject from './NewProject.svelte';
	import Account from './Account.svelte';
	import { onMount } from 'svelte';

	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}

	let pageIndex = 0;

	selectedMenuOption.subscribe((value) => {
		pageIndex = value;
	});
	let dataSet = false;
	onMount(() => {
		fetch('http://192.168.0.13:8080/download', {
			method: 'GET',
			headers: {
				authorization: sessionStorage.getItem('token') || localStorage.getItem('token')
			}
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					if (JSON.stringify(data.data) != '{}') {
						$gardens = JSON.parse(data.data).garden;
						dataSet = true;
					}
				} else {
					sessionStorage.removeItem('token');
					localStorage.removeItem('token');
					window.location.pathname = '/login';
				}
			});

		gardens.subscribe((data) => {
			console.log(data);
			if (dataSet) {
				fetch('http://192.168.0.13:8080/upload', {
					method: 'POST',
					headers: {
						authorization: sessionStorage.getItem('token') || localStorage.getItem('token')
					},
					body: JSON.stringify({ garden: $gardens })
				})
					.then((res) => {
						if (res.ok) {
							return res.json();
						}
						return Promise.reject(res);
					})
					.then((data) => {
						console.log(data);
					})
					.catch((err) => {
						if (err.status == 401) {
							sessionStorage.removeItem('token');
							localStorage.removeItem('token');
							window.location.pathname = '/login';
						}
					});
			}
		});
	});
</script>

<svelte:head>
	<title>CLORA</title>
</svelte:head>

<div id="all">
	<div id="sb">
		<Sidebar />
	</div>

	<div id="mc">
		{#if pageIndex == 0}
			<NewProject />
		{:else if pageIndex == 1}
			<div>{$menuOptions[pageIndex].name}</div>
		{:else if pageIndex == 2}
			<Account />
		{/if}
	</div>
</div>

<style>
	div#all {
		display: flex;
	}

	div#sb {
		width: 250px;
	}

	div#mc {
		width: 100%;
		height: 100vh;
		background: #f5f5f5;
		overflow: auto;
	}
</style>
