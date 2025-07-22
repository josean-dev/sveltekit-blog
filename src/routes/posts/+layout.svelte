<script lang="ts">
  import PageTransition from "$lib/components/PageTransition.svelte";
  import type { LayoutData } from "./$types";

  interface Props {
    data: LayoutData;
    children?: import('svelte').Snippet;
  }

  let { data, children }: Props = $props();
</script>

<PageTransition pagePath={data.pathname}>
  {@render children?.()}
</PageTransition>
