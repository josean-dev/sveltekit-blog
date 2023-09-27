<script lang="ts">
  import MainHeader from "$lib/components/MainHeader.svelte";
  import ThemeInitializer from "$lib/components/ThemeInitializer.svelte";
  import { fly } from "svelte/transition";
  import "../app.css";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  $: pagePath = data.pathname;
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-T3CWT307QF"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-T3CWT307QF");
  </script>
</svelte:head>

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
