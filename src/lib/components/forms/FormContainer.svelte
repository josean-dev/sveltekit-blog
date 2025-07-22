<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="max-w-2xl p-4">
  {@render children?.()}
</div>
