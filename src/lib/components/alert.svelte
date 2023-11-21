<script lang="ts">
  export let type: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' = 'info';
</script>

<div class="alert alert-{type}" role="alert">
  <slot />
</div>