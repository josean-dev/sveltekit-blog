<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLTableAttributes } from "svelte/elements";
  interface Props {
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { children, ...rest }: Props = $props();

  /* eslint-disable @typescript-eslint/no-unused-vars */
  
</script>

<div class="overflow-x-auto">
  <table
    {...rest}
    class={cn("w-full text-left", rest.class)}
  >
    {@render children?.()}
  </table>
</div>
