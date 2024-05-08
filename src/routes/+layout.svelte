<script lang="ts">
  import MainHeader from "$lib/components/MainHeader.svelte";
  import ThemeInitializer from "$lib/components/ThemeInitializer.svelte";
  import "../app.css";
  import GoogleAnalytics from "$lib/components/GoogleAnalytics.svelte";
  import MainMargins from "$lib/components/MainMargins.svelte";
  import MainPadding from "$lib/components/MainPadding.svelte";
</script>

<GoogleAnalytics />

<ThemeInitializer>
  <MainHeader />
  <main>
    <MainMargins>
      <MainPadding>
        <slot />
      </MainPadding>
    </MainMargins>
  </main>
</ThemeInitializer>
