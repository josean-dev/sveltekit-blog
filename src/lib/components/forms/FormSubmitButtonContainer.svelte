<script lang="ts">
  interface Props {
    children: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="my-6">
  {@render children?.()}
</div>
