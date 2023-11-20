<script>
	import Row from '$lib/components/row.svelte';
	import Column from '$lib/components/column.svelte';
	import Card from '$lib/components/card.svelte';
</script>

<h1>Welcome to Droplet Tools</h1>
<p>A one-click solution to deploy pre-configured Droplets to Digital Ocean.</p>
<Row>
	<Column>
		<Card link={{ href: '/ubuntu', text: 'Details' }}>
			<svelte:fragment slot="title">Ubuntu with Docker</svelte:fragment>
			<svelte:fragment slot="text"
				>Deploy a simple Ubuntu 23.04 Droplet with Docker installed.</svelte:fragment
			>
		</Card>
	</Column>
</Row>
