<script>
	import { onMount } from 'svelte';

	export let data;
	let canvas;

	onMount(() => {
		let ctx = canvas.getContext('2d');
		canvas.width = 36;
		canvas.height = 36;
		ctx.width = 36;
		ctx.height = 36;
		for (let y = 0; y < 12; y++) {
			for (let x = 0; x < 12; x++) {
				ctx.fillStyle = valueToRGB(data[y * 12 + x]);
				ctx.fillRect(x * 3, y * 3, 3, 3);
			}
		}
	});

	function valueToRGB(value) {
		return `rgb(${65 + (100 - value)},${65 + (100 - value)},200)`;
	}
</script>

<canvas id="canvas" bind:this={canvas} />

<style>
	#canvas {
		width: 36px;
		height: 36px;
	}
</style>
