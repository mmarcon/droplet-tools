<script>
  import Column from '$lib/components/column.svelte';
  import Row from '$lib/components/row.svelte';
  import { settings } from '$lib/stores/settings.store';
</script>

<form>
  <Row>
    <Column>
      <label for="doToken" class="form-label">Digital Ocean Token</label>
      <input type="text" class="form-control" id="doToken" placeholder="Your Token Here" bind:value={$settings.doToken}>
    </Column>
  </Row>
</form>