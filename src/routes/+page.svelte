<script>
	import CardsGrid from '$lib/components/cards-grid.svelte';
	import Column from '$lib/components/column.svelte';
	import Card from '$lib/components/card.svelte';

	export let data;
</script>

<h1>Welcome to Droplet Tools</h1>
<p>A one-click solution to deploy pre-configured Droplets to Digital Ocean.</p>
<CardsGrid>
	{#each data.templates as template}
		<Column>
			<Card link={{ href: `/templates/${template.id}`, text: 'Details' }}>
				<svelte:fragment slot="title">{template.title}</svelte:fragment>
				<svelte:fragment slot="text">{template.description}</svelte:fragment>
			</Card>
		</Column>
	{/each}
</CardsGrid>
