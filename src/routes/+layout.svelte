<script lang="ts">
  import MainHeader from "$lib/components/MainHeader.svelte";
  import ThemeInitializer from "$lib/components/ThemeInitializer.svelte";
  import "../app.css";
  import GoogleAnalytics from "$lib/components/GoogleAnalytics.svelte";
</script>

<GoogleAnalytics />

<ThemeInitializer>
  <MainHeader />
  <main class="mx-auto max-w-5xl pt-24">
    <slot />
  </main>
</ThemeInitializer>
