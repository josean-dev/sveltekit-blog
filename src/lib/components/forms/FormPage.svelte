<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="max-w-2xl mx-auto py-6">
  {@render children?.()}
</div>
