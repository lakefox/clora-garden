<script>
	import { selectedMenuOption, menuOptions } from '../stores.js';

	let options = $menuOptions;

	function update() {
		$selectedMenuOption = parseInt(this.dataset.index);
	}
</script>

<div id="bar">
	<div id="title">CLORA</div>
	<div id="options">
		{#each options as obj, i}
			<div class="option_cont" on:click={update} data-index={i}>
				<div class="down">{@html obj.icon}</div>
				{obj.name}
			</div>
		{/each}
	</div>
</div>

<style>
	#bar {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	#title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 40px;
		color: #333333;
		padding: 10px;
		background: #212121;
		width: 150px;
	}
	#options {
		width: 100%;
		margin-top: 50px;
	}
	.option_cont {
		width: 90%;
		height: 30px;
		margin-left: calc(10% - 10px);
		font-size: 18px;
		font-family: 'Space Grotesk', sans-serif;
		background: #fff;
		padding-left: 10px;
		cursor: pointer;
		line-height: 30px;
		color: #333333;
		margin-bottom: 10px;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		display: flex;
	}
	.option_cont:hover {
		color: #212121;
		background: #f5f5f5;
	}
	.down {
		line-height: 33px;
		margin-right: 12px;
		color: #4e4e4e;
	}
</style>
