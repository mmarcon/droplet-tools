<script lang="ts">
  import Code from '$lib/components/code.svelte';
  import Alert from '$lib/components/alert.svelte';

  import { onMount } from 'svelte';
  import { DO_REGIONS } from '$lib/constants';
  import { settings } from '$lib/stores/settings.store';
  import type { Region } from '$lib/do';

  let doRegions: Region[] = [];

  onMount(async () => {
    if (!$settings.doToken) {
      return;
    }

    doRegions = await fetch(DO_REGIONS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${$settings.doToken}`
      }
    })
      .then((response) => response.json())
      .then((data) => data.regions.filter((region : Region) => region.available));
  });

  export let data;
</script>

<h1>{data.template.title}</h1>
<p>{data.template.description}</p>
<h2>Bootstrap Script</h2>
<Code>
{data.template.bootstrap}
</Code>
<h2>
  Deployment Configuration
</h2>
{#if $settings.doToken}
  <Code>
    {JSON.stringify(doRegions, null, 2)}
  </Code>  
{:else}
  <Alert type="warning">
    Please set your Digital Ocean token in the settings.
  </Alert>
{/if}
