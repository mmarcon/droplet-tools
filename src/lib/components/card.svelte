<script>
  export let link = {
    href: "",
    text: "",
  };
</script>

<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">
      <slot name="title"></slot>
    </h5>
    <p class="card-text small">
      <slot name="text"></slot>
    </p>
    <a href="{link.href}" class="btn btn-primary">{link.text}</a>
  </div>
</div>