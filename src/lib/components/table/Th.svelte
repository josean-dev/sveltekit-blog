<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLThAttributes } from "svelte/elements";
  interface Props {
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { children, ...rest }: Props = $props();

  /* eslint-disable @typescript-eslint/no-unused-vars */
  
</script>

<th
  {...rest}
  class={cn(
    "px-6 py-4 font-bold border-b dark:border-gray-700 dark:text-gray-500 text-gray-500 text-sm uppercase",
    rest.class
  )}
>
  {@render children?.()}
</th>
