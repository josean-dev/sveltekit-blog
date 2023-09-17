<script lang="ts">
  import MainHeader from "$lib/components/MainHeader.svelte";
  import ThemeInitializer from "$lib/components/ThemeInitializer.svelte";
  import { fly } from "svelte/transition";
  import "../app.css";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  $: pagePath = data.pathname;
</script>

<ThemeInitializer>
  <MainHeader />
  {#key pagePath}
    <main
      in:fly={{ y: -15, duration: 200, delay: 300 }}
      out:fly={{ y: 15, duration: 200 }}
      class="pt-24 max-w-5xl mx-auto"
    >
      <slot />
    </main>
  {/key}
</ThemeInitializer>
