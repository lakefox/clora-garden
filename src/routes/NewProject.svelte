<script>
	import { selectedMenuOption, menuOptions, gardens } from '../stores.js';
	import GardenView from './GardenView.svelte';

	let gardenCopy = $gardens;

	function addGarden() {
		gardenCopy.push({
			name: 'Enter Name',
			data: [],
			width: 6,
			height: 6
		});
		$gardens = gardenCopy;
	}
</script>

<div id="container">
	<div id="title">
		Your Garden
		<div id="createGarden" on:click={addGarden}>Add Garden</div>
	</div>
	<div id="gardens">
		{#each $gardens as garden, i}
			<GardenView plot={i} />
		{/each}
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
	#gardens {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	#createGarden {
		width: 118px;
		height: 30px;
		background: #68e492;
		border-radius: 4px;
		color: #ffffff;
		font-family: 'Roboto', sans-serif;
		line-height: 30px;
		font-size: 16px;
		text-align: center;
		cursor: pointer;
		margin-top: 25px;
		user-select: none;
	}
</style>
