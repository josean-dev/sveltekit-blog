<script lang="ts">
  import PageTransition from "$lib/components/PageTransition.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<PageTransition pagePath={data.pathname}>
  <slot />
</PageTransition>
