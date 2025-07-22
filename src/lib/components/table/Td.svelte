<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLTdAttributes } from "svelte/elements";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  


  interface Props {
    href?: string;
    class?: string | undefined | null;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { href = "", class: klass = "", children, ...rest }: Props = $props();

  
</script>

<td
  class={cn({
    "dark:text-gray-300 text-gray-800": true,
    "border-b dark:border-gray-700": true,
    "px-6 py-4": !href,
    [klass || ""]: true
  })}
  {...rest}
>
  {#if href}
    <a
      {href}
      class={cn({
        block: true,
        "px-6 py-4": true
      })}
    >
      {@render children?.()}
    </a>
  {:else}
    {@render children?.()}
  {/if}
</td>
