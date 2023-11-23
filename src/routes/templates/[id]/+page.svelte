<script lang="ts">
	import Code from '$lib/components/code.svelte';
	import Alert from '$lib/components/alert.svelte';
	import Spinner from '$lib/components/spinner.svelte';
	import Button from '$lib/components/button.svelte';

	import { onMount } from 'svelte';
	import { settings } from '$lib/stores/settings.store';

	import type { Region, Size, Droplet, Image } from '$lib/do';
	import { DO_REGIONS, DO_SIZES, DO_IMAGES } from '$lib/do';
	import Column from '$lib/components/column.svelte';
	import Row from '$lib/components/row.svelte';

	export let data;

	let doRegions: Region[] = [];
	let doSizes: Size[] = [];
	let doImages: Image[] = [];

	let currentImage: Image | undefined;

	let dropletInfo: Droplet = {
		name: '',
		region: '',
		size: '',
		image: data.template.image,
		user_data: data.template.bootstrap,
		tags: ['droplet-tools']
	};

	$: readyToCreate = !!dropletInfo.name && !!dropletInfo.region && !!dropletInfo.size;

	onMount(async () => {
		if (!$settings.doToken) {
			return;
		}

		doImages = await fetch(DO_IMAGES, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$settings.doToken}`
			}
		})
			.then((response) => response.json())
			.then(({ images }) => (doImages = images.filter((image: Image) => image.public)));

		currentImage = doImages.find((image) => image.slug === data.template.image);

		doRegions = await fetch(DO_REGIONS, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$settings.doToken}`
			}
		})
			.then((response) => response.json())
			.then(({ regions }) => regions.filter((region: Region) => region.available && currentImage?.regions.includes(region.slug)));

		doSizes = await fetch(DO_SIZES, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$settings.doToken}`
			}
		})
			.then((response) => response.json())
			.then(({ sizes }) => (doSizes = sizes));


		dropletInfo.region = doRegions[0].slug;
		dropletInfo.size = doSizes[0].slug;
	});

	function getSizeInfo(sizeSlug: string) {
		const { description, price_hourly } = doSizes.find((s) => s.slug === sizeSlug) || {};
		return `${description} - $${price_hourly}/hour`;
	}
</script>

<h1>{data.template.title}</h1>
<p>{data.template.description}</p>
<h2>Image</h2>
{#if currentImage}
	<p>{currentImage?.description}</p>
{:else}
	<Spinner/>
{/if}
<h2>Bootstrap Script</h2>
<Code>
	{data.template.bootstrap}
</Code>
<h2>Deployment Configuration</h2>
{#if $settings.doToken}
	<form>
		<Row>
			<Column>
				<label for="name" class="form-label">Droplet Name</label>
				<input type="text" class="form-control" id="name" placeholder="My Droplet" bind:value={dropletInfo.name}/>
			</Column>
		</Row>
		<Row>
			<Column>
				<label for="region" class="form-label">Region</label>
				<select class="form-select" bind:value={dropletInfo.region} id="region">
					{#each doRegions as region}
						<option value={region.slug}>{region.name}</option>
					{/each}
				</select>
			</Column>
		</Row>
		<Row>
			<Column>
				<label for="size" class="form-label">Droplet Size</label>
				<select class="form-select" id="size" bind:value={dropletInfo.size}>
					{#if !dropletInfo.region}
						<option selected disabled>Please select a region</option>
					{:else}
						{#each doRegions.filter((region) => region.slug === dropletInfo.region)[0].sizes || [] as size}
							<option value={size}>{getSizeInfo(size)}</option>
						{/each}
					{/if}
				</select>
			</Column>
		</Row>
		<Row>
			<Column>
				<Button style="primary" disabled={!readyToCreate}>Deploy</Button>
			</Column>
		</Row>
	</form>
	<Code>
		{JSON.stringify(dropletInfo, null, 2)}
	</Code>
{:else}
	<Alert type="warning">Please set your Digital Ocean token in the settings.</Alert>
{/if}
