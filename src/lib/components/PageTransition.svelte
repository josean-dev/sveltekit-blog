<script lang="ts">
  import { fly } from "svelte/transition";
  interface Props {
    pagePath: string;
    children?: import('svelte').Snippet;
  }

  let { pagePath, children }: Props = $props();
</script>

{#key pagePath}
  <div
    in:fly={{ y: -15, duration: 200, delay: 300 }}
    out:fly={{ y: 15, duration: 200 }}
  >
    {@render children?.()}
  </div>
{/key}
