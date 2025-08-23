<script lang="ts">
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="max-w-2xl px-4 py-2">
  {@render children?.()}
</div>
