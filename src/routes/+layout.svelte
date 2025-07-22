<script lang="ts">
  import MainHeader from "$lib/components/MainHeader.svelte";
  import ThemeInitializer from "$lib/components/ThemeInitializer.svelte";
  import "../app.css";
  import GoogleAnalytics from "$lib/components/GoogleAnalytics.svelte";
  import MainMargins from "$lib/components/MainMargins.svelte";
  import MainPadding from "$lib/components/MainPadding.svelte";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<GoogleAnalytics />

<ThemeInitializer>
  <MainHeader />
  <main>
    <MainMargins>
      <MainPadding>
        {@render children?.()}
      </MainPadding>
    </MainMargins>
  </main>
</ThemeInitializer>
