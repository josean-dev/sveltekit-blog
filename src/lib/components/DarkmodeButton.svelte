<script lang="ts">
  import { darkmode } from "$lib/stores/darkmode";
  import { slide } from "svelte/transition";
  import MoonIcon from "./svg/MoonIcon.svelte";
  import SunIcon from "./svg/SunIcon.svelte";

  let inTransition = {
    duration: 400,
    delay: 500
  };

  let outTransition = {
    duration: 400
  };

  function toggleDarkmode() {
    if ($darkmode) {
      $darkmode = false;
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      $darkmode = true;
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }
</script>

<button
  class="p-2 text-purple-800 dark:text-yellow-200"
  on:click={toggleDarkmode}
>
  {#if $darkmode}
    <div in:slide={inTransition} out:slide={outTransition}>
      <SunIcon class="h-8 w-8 fill-current" />
    </div>
  {:else}
    <div in:slide={inTransition} out:slide={outTransition}>
      <MoonIcon class="h-8 w-8 fill-current" />
    </div>
  {/if}
</button>
