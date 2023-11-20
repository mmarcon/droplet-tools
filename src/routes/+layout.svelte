<script>
  import Nav from '$lib/components/nav.svelte';
  import Container from '$lib/components/container.svelte';
</script>

<Nav/>
<Container>
  <slot></slot>
</Container>
