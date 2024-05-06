<script lang="ts">
  import { fly } from "svelte/transition";
  export let pagePath: string;
</script>

{#key pagePath}
  <div
    in:fly={{ y: -15, duration: 200, delay: 300 }}
    out:fly={{ y: 15, duration: 200 }}
  >
    <slot />
  </div>
{/key}
