<script>
	import { gardens } from '../stores.js';
	import Canvas from './CanvasMicro.svelte';
	export let plot = 0;

	let thisPlot = parseInt(plot.toString());

	if ($gardens[plot].data.length == 0) {
		$gardens[plot].data = genGarden($gardens[plot].width, $gardens[plot].height);
	}
	let garden = $gardens[plot].data;

	let show = false;

	let selectedPlantX = 0;
	let selectedPlantY = 0;

	let brushSize = 1;
	let brushStep = 10;
	let plantSquare;

	function selectItem() {
		selectedPlantX = parseInt(this.dataset.x);
		selectedPlantY = parseInt(this.dataset.y);
		show = true;
	}

	function selectMini(e) {
		let all = getSquarePos();
		let base = this.getBoundingClientRect();
		let inter = getIntercept(base, all);
		for (let i = 0; i < inter.length; i++) {
			const el = inter[i].element;
			let x = parseInt(el.dataset.column);
			let y = parseInt(el.dataset.row);
			let index = y * 12 + x;
			let value = garden[selectedPlantY].row[selectedPlantX][index];
			let added = brushStep;
			if (e.type == 'contextmenu') {
				added *= -1;
			}
			garden[selectedPlantY].row[selectedPlantX][index] = Math.max(Math.min(value + added, 100), 0);
		}
		$gardens[plot].data = garden;
	}

	function genGarden(x, y) {
		return JSON.parse(
			JSON.stringify(new Array(y).fill({ row: new Array(x).fill(new Array(144).fill(0)) }))
		);
	}

	function valueToRGB(value) {
		return `rgb(${65 + (100 - value)},${65 + (100 - value)},200)`;
	}

	let brushTop = -400;
	let brushLeft = -400;

	function mouseOver(e) {
		let bcr = plantSquare.getBoundingClientRect();
		brushTop = Math.max(Math.min(e.clientY, bcr.y + bcr.height), bcr.y);
		brushLeft = Math.max(Math.min(e.clientX, bcr.x + bcr.width), bcr.x);
	}

	function mouseLeave(e) {
		// this.style.background = preBGColor;
	}

	function getSquarePos() {
		let els = document.querySelectorAll('.mini_column');
		let positData = [];
		for (let i = 0; i < els.length; i++) {
			const el = els[i].getBoundingClientRect();
			positData.push({ x: el.x, y: el.y, width: el.width, height: el.height, element: els[i] });
		}
		return positData;
	}

	function getIntercept(compare, all) {
		let els = [];
		for (let i = 0; i < all.length; i++) {
			const el = all[i];
			let intersect =
				compare.x <= el.x + el.width &&
				compare.x + compare.width >= el.x &&
				compare.y <= el.y + el.height &&
				compare.y + compare.height >= el.y;
			if (intersect) {
				els.push(el);
			}
		}
		return els;
	}
	function remove() {
		let gardenCopy = $gardens;
		gardenCopy.splice(thisPlot, 1);
		$gardens = gardenCopy;
	}
</script>

<div id="garden">
	<div id="num_select">
		<div id="name" contenteditable="true" bind:innerHTML={$gardens[plot].name} />
		<label for="width_num">Width</label>
		<input
			type="number"
			name="width"
			class="num"
			id="width_num"
			bind:value={$gardens[plot].width}
			min="1"
			max="6"
			on:change={() => {
				garden = genGarden($gardens[plot].width, $gardens[plot].height);
				$gardens[plot].data = garden;
			}}
		/>
		<label for="height_num">Height</label><input
			type="number"
			name="height"
			class="num"
			id="height_num"
			bind:value={$gardens[plot].height}
			min="1"
			max="6"
			on:change={() => {
				garden = genGarden($gardens[plot].width, $gardens[plot].height);
				$gardens[plot].data = garden;
			}}
		/>
		<i class="bx bx-x" on:click={remove} id="remove" />
	</div>
	{#if !show}
		{#each garden as w, y}
			<div class="row">
				{#each w.row as h, x}
					<div class="item" on:click={selectItem} data-x={x} data-y={y}>
						<Canvas bind:data={garden[y].row[x]} />
					</div>
				{/each}
			</div>
		{/each}
	{/if}
</div>

{#if show}
	<div
		id="brush"
		style:width={brushSize * 2 * 15 + 'px'}
		style:height={brushSize * 2 * 15 + 'px'}
		style:top={brushTop + 'px'}
		style:left={brushLeft + 'px'}
		on:mousemove={mouseOver}
		on:focus={mouseOver}
		on:mouseleave={mouseLeave}
		on:click|preventDefault={selectMini}
		on:contextmenu|preventDefault={selectMini}
	/>
	<div id="blur">
		<div
			id="bg_blur"
			on:click={() => {
				show = false;
			}}
		/>
		<div id="popup">
			<div id="title">Design Water Pattern</div>
			<div id="wp">Section {selectedPlantX + 1} x {selectedPlantY + 1}</div>
			<i
				class="bx bx-x"
				id="close"
				on:click={() => {
					show = false;
				}}
			/>
			<div id="plant_picker">
				<div id="plant_square" bind:this={plantSquare}>
					{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as x}
						<div class="mini_row">
							{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as y}
								<div
									class="mini_column"
									data-column={x}
									data-row={y}
									data-x={selectedPlantX}
									data-y={selectedPlantY}
									style:background={valueToRGB(
										garden[selectedPlantY].row[selectedPlantX][y * 12 + x]
									)}
									on:mousemove={mouseOver}
									on:focus={mouseOver}
									on:mouseleave={mouseLeave}
								>
									{garden[selectedPlantY].row[selectedPlantX][y * 12 + x]}
								</div>
							{/each}
						</div>
					{/each}
				</div>
				<div id="water_brush">
					<div id="bruch_title">Brush</div>
					<div id="brush_size_cont" class="cont">
						<label for="brush_size">Size</label>
						<div class="in_val">
							<input
								type="range"
								name="brush_size"
								id="brush_size"
								bind:value={brushSize}
								min="1"
								max="6"
							/>
							<div class="val_view">{brushSize} in</div>
						</div>
					</div>
					<div id="decay_cont" class="cont">
						<label for="decay_size">Step</label>
						<div class="in_val">
							<input
								type="range"
								name="decay_size"
								id="decay_size"
								bind:value={brushStep}
								min="1"
								max="10"
							/>
							<div class="val_view">{brushStep} in</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- 165 165 200 min -->

<!-- 65 65 200 max -->
<style>
	.row {
		display: flex;
		justify-content: center;
	}

	.item {
		width: 50px;
		height: 50px;
		margin: 4px;
		background: #eee;
		border-radius: 7px;
		color: #eee;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.item:hover {
		background: #ddd;
	}

	#garden {
		padding: 10px;
		border: 3px solid #eee;
		border-radius: 7px;
		width: fit-content;
		height: fit-content;
		margin-left: 12px;
		margin-right: 12px;
		margin-top: 25px;
	}

	.num {
		width: 50px;
		border: 2px solid #dbdbdb;
		border-radius: 4px;
		color: #212121;
		text-align: end;
		margin-left: 10px;
		margin-right: 10px;
	}

	#num_select {
		display: flex;
		justify-content: flex-end;
		font-family: 'Roboto', sans-serif;
		color: #5a5a5a;
	}
	#popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 700px;
		height: 500px;
		background: #fff;
		z-index: 3;
		border-radius: 7px;
		opacity: 100%;
	}
	#blur > * {
		user-select: none;
	}
	#bg_blur {
		background: #eee;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		opacity: 70%;
	}
	#title {
		font-family: 'Roboto', sans-serif;
		color: #212121;
		font-size: 25px;
		margin-left: 20px;
		margin-top: 20px;
	}
	#plant_square {
		width: 350px;
		height: 350px;
		background: #eee;
		border-radius: 7px;
		margin-top: 30px;
		margin-left: 20px;
		display: flex;
		padding: 4.5px;
	}

	.mini_column {
		width: 20px;
		height: 20px;
		background: #a7a7a7;
		margin: 4.5px;
		cursor: pointer;
		z-index: 5;
		color: #232323;
		font-size: 10px;
		text-align: center;
		line-height: 20px;
		font-family: 'Roboto';
		user-select: none;
	}

	.mini_row {
		display: grid;
	}
	#close {
		position: absolute;
		right: 15px;
		top: 15px;
		font-size: 30px;
		cursor: pointer;
	}
	#wp {
		color: #626262;
		font-size: 15px;
		font-family: 'Roboto', sans-serif;
		margin-left: 20px;
		margin-top: 5px;
	}

	#name {
		width: 100%;
		margin-left: 10px;
		cursor: pointer;
	}

	#plant_picker {
		display: flex;
	}

	#water_brush {
		margin-top: 30px;
		margin-left: 30px;
		margin-right: 30px;
		font-family: 'Roboto', sans-serif;
		color: #212121;
		width: 100%;
	}

	#bruch_title {
		font-size: 22px;
		text-align: center;
		margin-bottom: 20px;
	}

	#plant_picker {
		display: flex;
	}

	#water_brush {
		margin-top: 30px;
		margin-left: 30px;
		margin-right: 30px;
		font-family: 'Roboto', sans-serif;
		color: #212121;
		width: 100%;
	}

	#bruch_title {
		font-size: 22px;
		text-align: center;
		margin-bottom: 20px;
	}

	.cont {
		color: #3d3d3d;
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.in_val {
		display: flex;
	}

	#brush {
		position: absolute;
		border: 2px solid #737389;
		z-index: 100;
		transform: translate(-50%, -50%);
	}
	#remove {
		font-size: 20px;
		cursor: pointer;
	}
</style>
