<script>
  export let style = 'primary';
  export let disabled = true;
</script>

<button class="btn btn-{style}" {disabled}>
  <slot></slot>
</button>
