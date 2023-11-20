<script>
  import Code from '$lib/components/code.svelte';

  export let data;
</script>

<h1>{data.template.title}</h1>
<p>{data.template.description}</p>
<h2>Bootstrap Script</h2>
<Code>
{data.template.bootstrap}
</Code>
