<script lang="ts">
  import { browser } from "$app/environment";
  import { darkmode } from "$lib/stores/darkmode";

  if (browser) {
    $darkmode = window.prefersDarkmode;
  }
</script>

<svelte:head>
  <script>
    window.prefersDarkmode = false;

    if (
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      window.prefersDarkmode = true;
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  </script>
</svelte:head>

<slot />
