<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLTdAttributes } from "svelte/elements";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface $$Props extends Partial<HTMLTdAttributes> {
    href?: string;
  }

  export let href: string = "";

  let klass: string | undefined | null = "";

  export { klass as class };

  const classes = `block px-6 py-4 dark:text-gray-300 text-gray-800 
                   border-b dark:border-gray-700
                   ${klass}`;
</script>

<td
  class={cn({
    classes: !href
  })}
  {...$$restProps}
>
  {#if href}
    <a {href} class={classes}>
      <slot />
    </a>
  {:else}
    <slot />
  {/if}
</td>
